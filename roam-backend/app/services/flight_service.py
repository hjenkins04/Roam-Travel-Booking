import random
from datetime import datetime, timedelta
import uuid
from typing import List, Optional
from app.models.dto.flight_dto import FlightDTO
from app.models.dto.flight_search_dto import FlightSearchDTO
from app.repositories.flight_repository import FlightRepository
from app.models.entities.flight_entity import FlightEntity
from app.models.entities.flight_seats_entity import FlightSeatsEntity

class FlightService:
    @staticmethod
    def create_flight(flight_dto: FlightDTO) -> FlightEntity:
        """Create a new flight and add it to the database."""
        FlightRepository.add(flight_dto)
        return FlightRepository.get_by_guid(flight_dto.guid)

    @staticmethod
    def get_all_flights() -> List[FlightEntity]:
        """Retrieve all flights from the database."""
        return FlightRepository.get_all()

    @staticmethod
    def get_flight_by_id(guid: str) -> Optional[FlightEntity]:
        """Retrieve a flight by its GUID."""
        return FlightRepository.get_by_guid(guid)

    @staticmethod
    def get_flights_by_destination_id(destination_id: str) -> List[FlightEntity]:
        """Retrieve all flights arriving at a specific airport ID."""
        return FlightRepository.find_by_destination_id(destination_id)

    @staticmethod
    def get_flights_by_departure_id(departure_id: str) -> List[FlightEntity]:
        """Retrieve all flights departing from a specific airport ID."""
        return FlightRepository.find_by_departure_id(departure_id)

    @staticmethod
    def get_flights_by_airline_id(airline_id: str) -> List[FlightEntity]:
        """Retrieve all flights by a specific airline."""
        return FlightRepository.find_by_airline_id(airline_id)
    
    @staticmethod
    def get_flights_by_search_query(search_dto: FlightSearchDTO) -> List[FlightEntity]:
        """Retrieve flights by departure and arrival airport IDs."""
        return FlightRepository.find_by_departure_and_arrival(
            departure_airport_id=search_dto.departure_airport_id,
            arrival_airport_id=search_dto.arival_airport_id
        )

    @staticmethod
    def delete_flight(guid: str) -> bool:
        """Delete a flight by its GUID."""
        return FlightRepository.delete_flight(guid)
    
    @staticmethod
    def get_flight_seats_by_flight_id(flight_id: str) -> Optional[FlightSeatsEntity]:
        """Retrieve the seat configuration for a specific flight by its ID."""
        seat_config = FlightRepository.get_seat_configuration_by_flight_id(flight_id)
        if seat_config:
            return seat_config
        else:
            raise ValueError("Seat configuration not found for this flight.")

    @staticmethod
    def get_flight_seats_by_id(seat_configuration_id: str) -> Optional[FlightSeatsEntity]:
        """Retrieve a seat configuration by its own unique ID."""
        seat_config = FlightRepository.get_seat_configuration_by_id(seat_configuration_id)
        if seat_config:
            return seat_config
        else:
            raise ValueError("Seat configuration not found for this ID.")
        
    @staticmethod
    def get_random_flight(search_dto: FlightSearchDTO) -> FlightEntity:
        # Attempt to find a matching flight
        flights = FlightRepository.find_by_departure_and_arrival(
            departure_airport_id=search_dto.departure_airport_id,
            arrival_airport_id=search_dto.arival_airport_id
        )
        if flights:
            return flights[0]  # Return the first matching flight if found

        # Try finding a reverse route if no direct match exists
        reverse_flights = FlightRepository.find_by_departure_and_arrival(
            departure_airport_id=search_dto.arival_airport_id,
            arrival_airport_id=search_dto.departure_airport_id
        )

        if reverse_flights:
            reverse_flight = reverse_flights[0]
            
            # Parse, adjust, and format departure and arrival times
            departure_time = datetime.strptime(reverse_flight.departure_time, "%I:%M%p")
            adjusted_departure_time = departure_time + timedelta(hours=random.choice([-3, 3]))
            formatted_departure_time = adjusted_departure_time.strftime("%I:%M%p")

            arrival_time = datetime.strptime(reverse_flight.arrival_time, "%I:%M%p")
            travel_duration = arrival_time - departure_time
            adjusted_arrival_time = adjusted_departure_time + travel_duration
            formatted_arrival_time = adjusted_arrival_time.strftime("%I:%M%p")
            
            # Adjust the reverse flight’s attributes to create a new flight
            new_flight_dto = FlightDTO(
                guid=str(uuid.uuid4()),
                departure_time=formatted_departure_time,
                arrival_time=formatted_arrival_time,
                num_stops=reverse_flight.num_stops,
                price_economy=max(100, reverse_flight.price_economy + random.randint(-400, 400)),
                price_business=max(200, reverse_flight.price_business + random.randint(-400, 400)),
                baggage_allowance=reverse_flight.baggage_allowance,
                airline=reverse_flight.airline.to_dto(),
                departure_airport=reverse_flight.arrival_airport.to_dto(),
                arrival_airport=reverse_flight.departure_airport.to_dto(),
                flight_time_minutes=reverse_flight.flight_time_minutes,
                seat_configuration_id=None,
                layover=reverse_flight.layover.to_dto() if reverse_flight.layover else None
            )

            # Save and return the new flight
            FlightRepository.add(new_flight_dto)
            
            # Generate random seat configuration
            FlightService.create_random_seat_configuration(flight_id=new_flight_dto.guid)
            
            return FlightRepository.get_by_guid(new_flight_dto.guid)

        # Raise an error if no suitable flight or reverse flight could be generated
        raise ValueError("No matching or reverse flight available, and unable to generate a new one.")
    
    @staticmethod
    def create_random_seat_configuration(flight_id: str) -> FlightSeatsEntity:
        """
        Create a random seat configuration for a given flight ID if it doesn't already exist.
        """
        # Check for existing seat configuration for the flight
        seat_config = FlightSeatsEntity.query.filter_by(flight_id=flight_id).first()

        # If no existing configuration, create a new one
        if not seat_config:
            seat_config= FlightRepository.create_random_seat_configuration(flight_id=flight_id)
            return seat_config
        
    @staticmethod
    def mark_seat_as_booked(seat_configuration_id: str, seat_id: int) -> Optional[FlightSeatsEntity]:
        """
        Mark a specific seat as booked by its seat configuration ID and seat ID.
        """
        seat_config = FlightRepository.mark_seat_id_as_booked_by_seat_configuration_id(seat_configuration_id, seat_id)
        
        if seat_config is None:
           raise ValueError("Seat configuration or seat not found.")
        
        return seat_config


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

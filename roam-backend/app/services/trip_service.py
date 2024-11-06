from typing import List, Optional
from app.models.dto.trip_dto import TripDTO
from app.repositories.trip_repository import TripRepository
from app.models.entities.trip_entity import TripEntity
from app.models.entities.passenger_entity import PassengerEntity
from app.services.flight_service import FlightService

class TripService:
    @staticmethod
    def create_trip(trip_dto: TripDTO) -> TripEntity:
        """Create a new trip and add it to the database."""
        TripRepository.add(trip_dto)
        
        # Reserve Seats
        for passenger in trip_dto.passengers:
            if trip_dto.departing_flight:
                departing_seats = FlightService.get_flight_seats_by_flight_id(trip_dto.departing_flight.guid)
                if not departing_seats:
                    departing_seats = FlightService.create_random_seat_configuration(trip_dto.departing_flight.guid)
                    
                FlightService.mark_seat_as_booked(departing_seats.guid, passenger.departing_seat_id)
            
            if trip_dto.returning_flight:
                returning_seats = FlightService.get_flight_seats_by_flight_id(trip_dto.returning_flight.guid)
                if not returning_seats:
                    returning_seats = FlightService.create_random_seat_configuration(trip_dto.returning_flight.guid)
                    
                FlightService.mark_seat_as_booked(returning_seats.guid, passenger.returning_seat_id)   
        
        return TripRepository.get_by_guid(trip_dto.guid)

    @staticmethod
    def get_all_trips() -> List[TripEntity]:
        """Retrieve all trips from the database."""
        return TripRepository.get_all()

    @staticmethod
    def get_trip_by_id(guid: str) -> Optional[TripEntity]:
        """Retrieve a trip by its GUID."""
        return TripRepository.get_by_guid(guid)

    @staticmethod
    def get_round_trips(is_round_trip: bool) -> List[TripEntity]:
        """Retrieve all trips based on whether they are round trips."""
        return TripRepository.get_round_trips(is_round_trip)

    @staticmethod
    def get_trips_by_departing_flight(flight_guid: str) -> List[TripEntity]:
        """Retrieve all trips with a specific departing flight GUID."""
        return TripRepository.get_by_departing_flight(flight_guid)

    @staticmethod
    def get_trips_by_returning_flight(flight_guid: str) -> List[TripEntity]:
        """Retrieve all trips with a specific returning flight GUID."""
        return TripRepository.get_by_returning_flight(flight_guid)

    @staticmethod
    def delete_trip(guid: str) -> bool:
        """Delete a trip by its GUID."""
        return TripRepository.delete(guid)
    
    @staticmethod
    def delete_trip_ticket(trip_guid: str, passenger_guid: str) -> bool:
        """Delete a trip ticket by its trip GUID and passenger GUID."""
        return TripRepository.delete_ticket(trip_guid, passenger_guid)
    
    
    @staticmethod
    def get_all_passengers() -> List[PassengerEntity]:
        """Retrieve all passengers."""
        return TripRepository.get_all_passengers()

    @staticmethod
    def get_passengers_by_trip_id(trip_id: str) -> List[PassengerEntity]:
        """Retrieve all passengers by trip ID."""
        return TripRepository.get_passengers_by_trip_id(trip_id)

    @staticmethod
    def get_passengers_by_flight_id(flight_id: str) -> List[PassengerEntity]:
        """Retrieve all passengers by flight ID."""
        return TripRepository.get_passengers_by_flight_id(flight_id)

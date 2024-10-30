from typing import List, Optional
from app import db
from app.models.entities.trip_entity import TripEntity
from app.models.entities.flight_entity import FlightEntity
from app.models.entities.passenger_entity import PassengerEntity
from app.models.dto.trip_dto import TripDTO

class TripRepository:
    @staticmethod
    def add(trip_dto: TripDTO) -> None:
        """Add a new trip to the database, along with related flights and passengers if needed."""
        trip_entity = TripEntity.from_dto(trip_dto)
        db.session.add(trip_entity)
        db.session.commit()

    @staticmethod
    def get_all() -> List[TripEntity]:
        """Retrieve all trips from the database."""
        return TripEntity.query.all()

    @staticmethod
    def get_by_guid(guid: str) -> Optional[TripEntity]:
        """Retrieve a trip by its GUID."""
        return TripEntity.query.filter_by(guid=guid).first()


    @staticmethod
    def get_round_trips(is_round_trip: bool) -> List[TripEntity]:
        """Retrieve trips based on whether they are round trips."""
        return TripEntity.query.filter_by(is_round_trip=is_round_trip).all()

    @staticmethod
    def get_by_departing_flight(flight_guid: str) -> List[TripEntity]:
        """Retrieve trips based on the departing flight GUID."""
        return TripEntity.query.filter_by(departing_flight_id=flight_guid).all()

    @staticmethod
    def get_by_returning_flight(flight_guid: str) -> List[TripEntity]:
        """Retrieve trips based on the returning flight GUID."""
        return TripEntity.query.filter_by(returning_flight_id=flight_guid).all()

    @staticmethod
    def delete(guid: str) -> bool:
        """Delete a trip by its GUID."""
        trip = TripRepository.get_by_guid(guid)
        if trip:
            db.session.delete(trip)
            db.session.commit()
            return True
        return False
    
    
    @staticmethod
    def get_all_passengers() -> List[PassengerEntity]:
        """Retrieve all passengers from the database."""
        return PassengerEntity.query.all()

    @staticmethod
    def get_passengers_by_trip_id(trip_id: str) -> List[PassengerEntity]:
        """Retrieve all passengers associated with a specific trip ID."""
        return PassengerEntity.query.filter_by(trip_id=trip_id).all()

    @staticmethod
    def get_passengers_by_flight_id(flight_id: str) -> List[PassengerEntity]:
        """Retrieve all passengers associated with a specific flight ID."""
        return PassengerEntity.query.filter(
            (PassengerEntity.departing_flight_id == flight_id) | 
            (PassengerEntity.returning_flight_id == flight_id)
        ).all()

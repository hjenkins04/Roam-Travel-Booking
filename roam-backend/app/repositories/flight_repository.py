from typing import List, Optional
from app import db
from app.models.entities.flight_entity import FlightEntity
from app.models.dto.flight_dto import FlightDTO

class FlightRepository:
    @staticmethod
    def add(flight_dto: FlightDTO) -> None:
        """Add a flight to the database, creating any linking the layover, airport and airline as needed."""
        flight_entity = FlightEntity.from_dto(flight_dto)
        db.session.add(flight_entity)
        db.session.commit()

    @staticmethod
    def get_all() -> List[FlightEntity]:
        """Retrieve all flights from the database."""
        return FlightEntity.query.all()

    @staticmethod
    def get_by_guid(guid: str) -> Optional[FlightEntity]:
        """Retrieve a flight by its GUID."""
        return FlightEntity.query.filter_by(guid=guid).first()

    @staticmethod
    def find_by_destination_id(destination_id: str) -> List[FlightEntity]:
        """Find flights by destination airport ID."""
        return FlightEntity.query.filter_by(arrival_airport_id=destination_id).all()

    @staticmethod
    def find_by_departure_id(departure_id: str) -> List[FlightEntity]:
        """Find flights by departure airport ID."""
        return FlightEntity.query.filter_by(departure_airport_id=departure_id).all()

    @staticmethod
    def find_by_airline_id(airline_id: str) -> List[FlightEntity]:
        """Find flights by airline ID."""
        return FlightEntity.query.filter_by(airline_id=airline_id).all()

    @staticmethod
    def delete_flight(guid: str) -> bool:
        """Delete a flight by its GUID."""
        flight = FlightRepository.get_by_guid(guid)
        if flight:
            db.session.delete(flight)
            db.session.commit()
            return True
        return False

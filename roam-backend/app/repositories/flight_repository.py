from typing import List, Optional
from app import db
import uuid
from app.models.entities.flight_entity import FlightEntity
from app.models.entities.flight_seats_entity import FlightSeatsEntity
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
    def find_by_departure_and_arrival(departure_airport_id: str, arrival_airport_id: str) -> List[FlightEntity]:
        """Find flights by departure and arrival airport IDs."""
        query = FlightEntity.query

        if departure_airport_id:
            query = query.filter_by(departure_airport_id=departure_airport_id)
        if arrival_airport_id:
            query = query.filter_by(arrival_airport_id=arrival_airport_id)
        
        return query.all()

    @staticmethod
    def delete_flight(guid: str) -> bool:
        """Delete a flight by its GUID."""
        flight = FlightRepository.get_by_guid(guid)
        print(f"Flight retrieved for deletion: {flight}")
        if flight:
            db.session.delete(flight)
            db.session.commit()
            return True
        return False
    
    @staticmethod
    def get_seat_configuration_by_flight_id(flight_id: str) -> Optional[FlightSeatsEntity]:
        """Retrieve seat configuration for a given flight ID."""
        return FlightSeatsEntity.query.filter_by(flight_id=flight_id).first()

    @staticmethod
    def get_seat_configuration_by_id(seat_configuration_id: str) -> Optional[FlightSeatsEntity]:
        """Retrieve seat configuration by its own ID."""
        return FlightSeatsEntity.query.filter_by(guid=seat_configuration_id).first()
    
    @staticmethod
    def create_random_seat_configuration(flight_id: str) -> FlightSeatsEntity:
        """
        Create a random seat configuration for a given flight ID.
        """
        seat_config = FlightSeatsEntity(guid=str(uuid.uuid4()), flight_id=flight_id)
        seat_config.generate_seat_configuration()
        db.session.add(seat_config)
        
        return seat_config
    
    @staticmethod
    def mark_seat_id_as_booked_by_seat_configuration_id(seat_configuration_id: str, seat_id: int) -> Optional[FlightSeatsEntity]:
        """Mark a seat as booked by its seat configuration ID and seat ID."""
        seat_config = FlightSeatsEntity.query.filter_by(guid=seat_configuration_id).first()

        if not seat_config:
            return None  # Seat configuration not found

        # Find the seat within the seat configuration
        seat = next((s for s in seat_config.seat_configuration if s.get("seat_id") == seat_id), None)

        if seat:
            seat["available"] = False  # Set seat as booked
            db.session.commit()
            return seat_config
        else:
            return None


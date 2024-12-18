from app import db
import uuid
from app.models.entities.flight_entity import FlightEntity
from app.models.entities.passenger_entity import PassengerEntity
from app.models.dto.trip_dto import TripDTO
from app.utils import is_valid_uuid4

class TripEntity(db.Model):
    """Represents a trip, including flight details and passenger assignments."""
    __tablename__ = 'trips'
    guid = db.Column(db.String(36), primary_key=True, unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    is_round_trip = db.Column(db.Boolean, nullable=False)
    departure_date = db.Column(db.Date, nullable=False)
    return_date = db.Column(db.Date, nullable=True)  # Null if one-way trip
    
    # Foreign keys
    departing_flight_id = db.Column(db.String(36), db.ForeignKey('flights.guid', ondelete="CASCADE"), nullable=False)
    returning_flight_id = db.Column(db.String(36), db.ForeignKey('flights.guid', ondelete="CASCADE"), nullable=True)

    # Relationships
    departing_flight = db.relationship("FlightEntity", foreign_keys=[departing_flight_id], back_populates="departing_trips", passive_deletes=True)
    returning_flight = db.relationship("FlightEntity", foreign_keys=[returning_flight_id], back_populates="returning_trips", passive_deletes=True)
    passengers = db.relationship("PassengerEntity", back_populates="trip", cascade="all, delete-orphan")


    def to_dto(self) -> TripDTO:
        return TripDTO(
            guid=self.guid,
            name=self.name,
            is_round_trip=self.is_round_trip,
            departure_date = self.departure_date,
            return_date = self.return_date,
            departing_flight=self.departing_flight.to_dto() if self.departing_flight else None,
            returning_flight=self.returning_flight.to_dto() if self.returning_flight else None,
            passengers=[passenger.to_dto() for passenger in self.passengers]
        )

    @staticmethod
    def from_dto(dto: TripDTO) -> "TripEntity":
        if not is_valid_uuid4(dto.guid):
            dto.guid = str(uuid.uuid4())
        
        # Check for departing flight and create it if it doesn't exist
        if dto.departing_flight:
            departing_flight = FlightEntity.query.filter_by(guid=dto.departing_flight.guid).first()
            if not departing_flight:
                departing_flight = FlightEntity.from_dto(dto.departing_flight)
                db.session.add(departing_flight)
        
        # Check for returning flight and create it if it doesn't exist
        returning_flight = None
        if dto.returning_flight:
            returning_flight = FlightEntity.query.filter_by(guid=dto.returning_flight.guid).first()
            if not returning_flight:
                returning_flight = FlightEntity.from_dto(dto.returning_flight)
                db.session.add(returning_flight)

        trip = TripEntity(
            guid=dto.guid,
            name=dto.name,
            is_round_trip=dto.is_round_trip,
            departure_date=dto.departure_date,
            return_date=dto.return_date,
            departing_flight=departing_flight,
            returning_flight=returning_flight,
        )

        list_passangers = []
        if dto.passengers:
            for passanger in dto.passengers:
                passenger = PassengerEntity.query.filter_by(guid=passanger.guid).first()
                if not passenger:
                    passenger = PassengerEntity.from_dto(passanger)
                    passenger.trip_id = trip.guid
                    db.session.add(passenger)
                list_passangers.append(passenger)
                
        trip.passengers = list_passangers

        db.session.add(trip)
        db.session.commit()
        return trip
    
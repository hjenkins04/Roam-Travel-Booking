import uuid
from app import db
import random
from app.models.entities.airline_entity import AirlineEntity
from app.models.entities.airport_entity import AirportEntity
from app.models.entities.layover_entity import LayoverEntity
from app.models.entities.flight_seats_entity import FlightSeatsEntity
from app.models.dto.flight_dto import FlightDTO

class FlightEntity(db.Model):
    """Represents a flight with details like duration, departure and arrival times, stops, prices, and related airline and airports."""
    __tablename__ = 'flights'
    guid: str = db.Column(db.String(36), primary_key=True, unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    flight_time_minutes: int = db.Column(db.Integer, nullable=False)  # Flight duration in minutes
    departure_time: str = db.Column(db.String(5), nullable=False)  # Time in HH:MM format
    arrival_time: str = db.Column(db.String(5), nullable=False)  # Time in HH:MM format
    num_stops: int = db.Column(db.Integer, nullable=True)
    price_economy: float = db.Column(db.Float, nullable=False)
    price_business: float = db.Column(db.Float, nullable=True)
    baggage_allowance: str = db.Column(db.String(50), nullable=False)
    
    # Foreign keys
    airline_id: str = db.Column(db.String(36), db.ForeignKey('airlines.guid'), nullable=False)
    departure_airport_id: str = db.Column(db.String(36), db.ForeignKey('airports.guid'), nullable=False)
    arrival_airport_id: str = db.Column(db.String(36), db.ForeignKey('airports.guid'), nullable=False)

    # Relationships
    airline = db.relationship("AirlineEntity", back_populates="flights")
    departure_airport = db.relationship("AirportEntity", foreign_keys=[departure_airport_id], back_populates="departure_flights")
    arrival_airport = db.relationship("AirportEntity", foreign_keys=[arrival_airport_id], back_populates="arrival_flights")
    seat_configuration = db.relationship("FlightSeatsEntity", back_populates="flight", uselist=False, single_parent=True, cascade="all, delete-orphan")
    
    layover = db.relationship("LayoverEntity", back_populates="flight", uselist=False, single_parent=True, cascade="all, delete-orphan")

    departing_trips = db.relationship("TripEntity", foreign_keys="[TripEntity.departing_flight_id]", back_populates="departing_flight", passive_deletes=True)
    returning_trips = db.relationship("TripEntity", foreign_keys="[TripEntity.returning_flight_id]", back_populates="returning_flight", passive_deletes=True)
    

    def to_dto(self) -> FlightDTO:
        return FlightDTO(
            guid=self.guid,
            flight_time_minutes=self.flight_time_minutes,
            departure_time=self.departure_time,
            arrival_time=self.arrival_time,
            num_stops=self.num_stops,
            price_economy=self.price_economy,
            price_business=self.price_business,
            baggage_allowance=self.baggage_allowance,
            airline=self.airline.to_dto(),
            departure_airport=self.departure_airport.to_dto(),
            arrival_airport=self.arrival_airport.to_dto(),
            layover=self.layover.to_dto() if self.layover else None,
            seat_configuration_id=self.seat_configuration.guid if self.seat_configuration else None
        )

    @staticmethod
    def from_dto(dto: FlightDTO) -> "FlightEntity":
        # Check for airline and create it if it doesn't exist
        # Initialize variables to None
        airline = None
        departure_airport = None
        arrival_airport = None
        seat_config = None
        layover = None

        if dto.airline:
            airline = AirlineEntity.query.filter_by(guid=dto.airline.guid).first()
            if not airline:
                airline = AirlineEntity.from_dto(dto.airline)
                db.session.add(airline)
                
        # Check for departure airport and create it if it doesn't exist
        departure_airport = None
        if dto.departure_airport:
            departure_airport = AirportEntity.query.filter_by(guid=dto.departure_airport.guid).first()
            if not departure_airport:
                departure_airport = AirportEntity.from_dto(dto.departure_airport)
                db.session.add(departure_airport)
                
        # Check for arrival airport and create it if it doesn't exist
        arrival_airport = None
        if dto.arrival_airport:
            arrival_airport = AirportEntity.query.filter_by(guid=dto.arrival_airport.guid).first()
            if not arrival_airport:
                arrival_airport = AirportEntity.from_dto(dto.arrival_airport)
                db.session.add(arrival_airport)
                
        # Check for flight seat configuration and create it if it doesn't exist
        seat_config = FlightSeatsEntity.query.filter_by(flight_id=dto.guid).first()
        if not seat_config:
            seat_config = FlightSeatsEntity(guid=str(uuid.uuid4()), flight_id=dto.guid)
            seat_config.generate_seat_configuration()
            db.session.add(seat_config)
                
        # Check for layover and create it if it doesn't exist
        layover = None
        if dto.layover:
            #layover_airport = AirportEntity.query.filter_by(guid=dto.layover.airport.guid).first()
            # if not layover_airport:
            #     layover_airport = AirportEntity.from_dto(dto.layover.airport)
            #     layover_airport.guid = str(uuid.uuid4())
            #     db.session.add(layover_airport)
            layover = LayoverEntity.query.filter_by(guid=dto.layover.guid).first()
            if not layover:
                layover = LayoverEntity.from_dto(dto.layover)
                #layover.guid = str(uuid.uuid4())
                db.session.add(layover)

        flight = FlightEntity(
            guid=dto.guid,
            flight_time_minutes=dto.flight_time_minutes,
            departure_time=dto.departure_time,
            arrival_time=dto.arrival_time,
            num_stops=dto.num_stops,
            price_economy=dto.price_economy,
            price_business=dto.price_business,
            baggage_allowance=dto.baggage_allowance,
            airline=airline,
            departure_airport=departure_airport,
            arrival_airport=arrival_airport,
            seat_configuration= seat_config 
        )

        if layover:
            flight.layover = layover

        db.session.commit()
        return flight
from app import db
import uuid
from app.models.dto.passenger_dto import PassengerDTO
from app.utils import is_valid_uuid4

class PassengerEntity(db.Model):
    """Represents a passenger associated with a trip, including seat assignments."""
    __tablename__ = 'passengers'
    guid = db.Column(db.String(36), primary_key=True, unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    
    # Foreign key to Trip
    trip_id = db.Column(db.String(36), db.ForeignKey('trips.guid'), nullable=False)
    trip = db.relationship("TripEntity", back_populates="passengers")

    # Seat assignments for both departing and returning flights
    departing_seat_id = db.Column(db.Integer, nullable=False)
    returning_seat_id = db.Column(db.Integer, nullable=True)
    
    
    def to_dto(self) -> PassengerDTO:
        return PassengerDTO(
            guid=self.guid,
            trip_id=self.trip_id,
            name=self.name,
            departing_seat_id=self.departing_seat_id,
            returning_seat_id=self.returning_seat_id,
            )

    @staticmethod
    def from_dto(dto: PassengerDTO) -> "PassengerEntity":
        if not is_valid_uuid4(dto.guid):
            dto.guid = str(uuid.uuid4())
        if not dto.name  or dto.name == "":
            dto.name = "Name Not Provided"
        return PassengerEntity(
            guid=dto.guid,
            trip_id=dto.trip_id,
            name=dto.name,
            departing_seat_id=dto.departing_seat_id,
            returning_seat_id=dto.returning_seat_id,
        )
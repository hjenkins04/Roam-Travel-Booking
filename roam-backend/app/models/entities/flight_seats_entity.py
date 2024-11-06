import uuid
from app import db
import random
from app.models.dto.flight_seats_dto import FlightSeatsDTO

class FlightSeatsEntity(db.Model):
    """Represents seat availability and configuration for a specific flight."""
    __tablename__ = 'flight_seats'
    guid: str = db.Column(db.String(36), primary_key=True, unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    seats_available: int = db.Column(db.Integer)

    # Foreign keys
    flight_id: str = db.Column(db.String(36), db.ForeignKey('flights.guid'), unique=True, nullable=False)
    
    # Relationships
    flight = db.relationship("FlightEntity", back_populates="seat_configuration", uselist=False, passive_deletes=True)

    # JSON seat configuration
    seat_configuration = db.Column(db.JSON, nullable=False)
    
    def generate_seat_configuration(self):
        """Generates the default seat configuration for the flight."""
        seats = []
        for i in range(1, 189):  # Seats 1 to 188
            if i <= 20:  # Business class
                seat_type = "Business"
                position = "Window" if i % 4 in [1, 4] else "Aisle"
            else:  # Economy class
                seat_type = "Economy"
                position = (
                    "Window" if i % 6 in [1, 6]
                    else "Aisle" if i % 6 in [2, 5]
                    else "Middle"
                )
            seats.append({"seat_id": i, "type": seat_type, "position": position, "available": True})

        self.seat_configuration = seats
        self.occupy_seats_randomly()  # Apply occupancy after configuration is set

    def occupy_seats_randomly(self):
        """Randomly occupies seats to achieve realistic occupancy levels with passenger groupings."""
        total_seats = 188
        occupied_percentage = random.uniform(0.25, 0.80)  # Occupy between 25% and 80% of the plane
        seats_to_occupy = int(total_seats * occupied_percentage)
        
        self.seats_available = total_seats - seats_to_occupy

        remaining_seats_to_occupy = seats_to_occupy
        i = 0
        while remaining_seats_to_occupy > 0 and i < len(self.seat_configuration):
            seat = self.seat_configuration[i]
            if seat["available"]:
                # 75% chance of choosing this seat and possibly adjacent ones
                if random.random() < 0.75:
                    seat["available"] = False
                    remaining_seats_to_occupy -= 1

                    # Attempt to occupy adjacent seats
                    if remaining_seats_to_occupy > 0 and seat["type"] == "Economy":
                        adjacent_indices = [i + 1, i - 1] if seat["position"] in ["Middle", "Aisle"] else [i + 1]
                        for adj_idx in adjacent_indices:
                            if 0 <= adj_idx < total_seats and self.seat_configuration[adj_idx]["available"]:
                                self.seat_configuration[adj_idx]["available"] = False
                                remaining_seats_to_occupy -= 1
                                if remaining_seats_to_occupy == 0:
                                    break
            i += 1

    def to_dto(self) -> FlightSeatsDTO:
        return FlightSeatsDTO(
            guid=self.guid,
            seats_available=self.seats_available,
            flight_id=self.flight_id,
            seat_configuration=self.seat_configuration
        )

    @staticmethod
    def from_dto(dto: FlightSeatsDTO) -> "FlightSeatsEntity":
        flight_seats = FlightSeatsEntity(
            guid=dto.guid,
            seats_available=dto.seats_available,
            flight_id=dto.flight_id,
            seat_configuration=dto.seat_configuration
        )

        db.session.commit()
        return flight_seats
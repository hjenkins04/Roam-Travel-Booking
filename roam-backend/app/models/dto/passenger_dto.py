from typing import Optional

class PassengerDTO:
    """DTO for passenger details, including trip and seat information."""
    def __init__(
        self,
        guid: str,
        trip_id: str,
        name: str,
        departing_seat_id: int,
        returning_seat_id: Optional[int] = None
    ):
        self.guid = guid
        self.trip_id = trip_id
        self.name = name
        self.departing_seat_id = departing_seat_id
        self.returning_seat_id = returning_seat_id

    def to_dict(self) -> dict:
        return {
            "guid": self.guid,
            "trip_id": self.trip_id,
            "name": self.name,
            "departing_seat_id": self.departing_seat_id,
            "returning_seat_id": self.returning_seat_id,
        }
        
    @staticmethod
    def from_dict(data: dict) -> "PassengerDTO":
        return PassengerDTO(
            guid=data.get("guid"),
            trip_id=data.get("trip_id"),
            name=data.get("name"),
            departing_seat_id=data.get("departing_seat_id"),
            returning_seat_id=data.get("returning_seat_id")
        )

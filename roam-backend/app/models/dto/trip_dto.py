from typing import Optional, List
from datetime import date
from app.models.dto.flight_dto import FlightDTO
from app.models.dto.passenger_dto import PassengerDTO
from app.utils import parse_date

class TripDTO:
    """DTO for trip details, including flights and passengers."""
    def __init__(
        self,
        guid: str,
        name: str,
        is_round_trip: bool,
        departure_date: Optional[date],
        return_date: Optional[date],
        departing_flight: Optional[FlightDTO],
        returning_flight: Optional[FlightDTO],
        passengers: List[PassengerDTO]
    ):
        self.guid = guid
        self.name = name
        self.is_round_trip = is_round_trip
        self.departure_date = departure_date
        self.return_date = return_date
        self.departing_flight = departing_flight
        self.returning_flight = returning_flight
        self.passengers = passengers

    def to_dict(self) -> dict:
        return {
            "guid": self.guid,
            "name": self.name,
            "is_round_trip": self.is_round_trip,
            "departure_date": self.departure_date.isoformat() if self.departure_date else None,
            "return_date": self.return_date.isoformat() if self.return_date else None,
            "departure_date": self.departure_date.isoformat() if self.departure_date else None,
            "return_date": self.return_date.isoformat() if self.return_date else None,
            "departing_flight": self.departing_flight.to_dict() if self.departing_flight else None,
            "returning_flight": self.returning_flight.to_dict() if self.returning_flight else None,
            "passengers": [p.to_dict() for p in self.passengers],
        }
        
    @staticmethod
    def from_dict(data: dict) -> "TripDTO":
        return TripDTO(
            guid=data.get("guid"),
            name=data.get("name"),
            is_round_trip=data.get("is_round_trip"),
            departure_date=parse_date(data.get("departure_date")),
            return_date=parse_date(data.get("return_date")),
            departing_flight=FlightDTO.from_dict(data["departing_flight"]) if data.get("departing_flight") else None,
            returning_flight=FlightDTO.from_dict(data["returning_flight"]) if data.get("returning_flight") else None,
            passengers=[
                PassengerDTO.from_dict(p) for p in data.get("passengers", [])
            ]
        )
    

        
    

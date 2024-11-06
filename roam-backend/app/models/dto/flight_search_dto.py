from typing import Optional, Dict

class FlightSearchDTO:
    """DTO for searching flights by airport IDs."""
    def __init__(self, departure_airport_id: str, arival_airport_id: str):
        self.departure_airport_id = departure_airport_id
        self.arival_airport_id = arival_airport_id
        

    def to_dict(self) -> Dict[str, Optional[Dict]]:
        return {
            "departure_airport_id": self.departure_airport_id,
            "arival_airport_id": self.arival_airport_id,
        }
        
    @staticmethod
    def from_dict(data: Dict[str, str]) -> "FlightSearchDTO":
        return FlightSearchDTO(
            departure_airport_id=data.get("departure_airport_id", ""),
            arival_airport_id=data.get("arival_airport_id", "")
        )

from typing import Optional, Dict

class FlightSearchDTO:
    def __init__(self, departure_airport_id: str, arival_airport_id: str):
        self.departure_airport_id = departure_airport_id
        self.arival_airport_id = arival_airport_id
        

    def to_dict(self) -> Dict[str, Optional[Dict]]:
        return {
            "departure_airport_id": self.departure_airport_id,
            "arival_airport_id": self.arival_airport_id,
        }

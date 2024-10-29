from typing import Optional, Dict, Union
from app.models.dto.airport_dto import AirportDTO

class LayoverDTO:
    def __init__(self, guid: str, airport: AirportDTO, duration_minutes: int):
        self.guid = guid
        self.airport = airport
        self.duration_minutes = duration_minutes
    
    def to_dict(self) -> Dict[str, Union[str, int, Dict]]:
        return {
            "guid": self.guid,
            "airport": self.airport.to_dict(),
            "duration_minutes": self.duration_minutes
        }

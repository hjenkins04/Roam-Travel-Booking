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
        
    @staticmethod
    def from_dict(data: Dict[str, Union[str, int, Dict]]) -> "LayoverDTO":
        return LayoverDTO(
            guid=data.get("guid", ""),
            airport=AirportDTO.from_dict(data.get("airport", {})),
            duration_minutes=data.get("duration_minutes", 0)
        )

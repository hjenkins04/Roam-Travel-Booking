from typing import Optional, Dict, Union
from typing import Optional

class AirlineDTO:
    def __init__(self, guid: str, icao_code: str, name: str, logo_path: Optional[str] = None):
        self.guid = guid
        self.icao_code = icao_code
        self.name = name
        self.logo_path = logo_path
        
    def to_dict(self) -> Dict[str, Optional[str]]:
        return {
            "guid": self.guid,
            "icao_code": self.icao_code,
            "name": self.name,
            "logo_path": self.logo_path
        }
        
    @staticmethod
    def from_dict(data: Dict[str, str]) -> "AirlineDTO":
        return AirlineDTO(
            guid=data["guid"],
            icao_code=data["icao_code"],
            name=data["name"],
            logo_path=data.get("logo_path")
        )
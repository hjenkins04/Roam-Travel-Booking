from typing import Optional, Dict

class LocationDTO:
    def __init__(self, guid: str, latitude: float, longitude: float) -> None:
        self.guid = guid
        self.latitude = latitude
        self.longitude = longitude

    def to_dict(self) -> Dict[str, float]:
        return {
            "guid": self.guid,
            "latitude": self.latitude,
            "longitude": self.longitude,
        }
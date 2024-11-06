from typing import Optional, Dict, Union

class LocationDTO:
    """DTO for geographic location details with latitude and longitude."""
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
        
    @staticmethod
    def from_dict(data: Dict[str, Union[str, float]]) -> "LocationDTO":
        return LocationDTO(
            guid=data.get("guid", ""),
            latitude=data.get("latitude", 0.0),
            longitude=data.get("longitude", 0.0)
        )
from typing import Optional, Dict, Union
from app.models.dto.location_dto import LocationDTO
from app.models.dto.country_dto import CountryDTO
from app.models.dto.continent_dto import ContinentDTO

class AirportDTO:
    def __init__(self, guid: str, full_name: str, short_name: str, municipality_name: str, iata_code: Optional[str],
                 location: Optional[Union[Dict, LocationDTO]],
                 country: Optional[Union[Dict, CountryDTO]]) -> None:
        self.guid = guid
        self.full_name = full_name
        self.short_name = short_name
        self.municipality_name = municipality_name
        self.iata_code = iata_code
        self.location = self.create_location_dto(location)
        self.country = self.create_country_dto(country)

    def to_dict(self) -> Dict[str, Optional[Dict]]:
        return {
            "guid": self.guid,
            "full_name": self.full_name,
            "short_name": self.short_name,
            "municipality_name": self.municipality_name,
            "iata_code": self.iata_code,
            "location": self.location.to_dict() if self.location else None,
            "country": self.country.to_dict() if self.country else None
        }
        
    @staticmethod
    def from_dict(data: Dict[str, Union[str, Dict]]) -> "AirportDTO":
        return AirportDTO(
            guid=data["guid"],
            full_name=data["full_name"],
            short_name=data["short_name"],
            municipality_name=data["municipality_name"],
            iata_code=data.get("iata_code"),
            location=LocationDTO.from_dict(data["location"]) if data.get("location") else None,
            country=CountryDTO.from_dict(data["country"]) if data.get("country") else None
        )

    def create_location_dto(self, location: Optional[Union[Dict, LocationDTO]]) -> Optional[LocationDTO]:
        if isinstance(location, dict):
            return LocationDTO(
                guid=location.get("guid"),
                latitude=location.get("latitude"),
                longitude=location.get("longitude")
            )
        elif isinstance(location, LocationDTO):
            return location
        return None

    def create_country_dto(self, country: Optional[Union[Dict, CountryDTO]]) -> Optional[CountryDTO]:
        if isinstance(country, dict):
            return CountryDTO(
                guid=country.get("guid"),
                code=country.get("code"),
                name=country.get("name")
            )
        elif isinstance(country, CountryDTO):
            return country
        return None
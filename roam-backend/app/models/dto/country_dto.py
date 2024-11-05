from typing import Optional, Dict, Union
from app.models.dto.continent_dto import ContinentDTO

class CountryDTO:
    """DTO for country details, linked to a continent."""
    def __init__(self, guid: str, code: str, name: str, continent: Optional[Union[Dict, ContinentDTO]] ) -> None:
        self.guid = guid
        self.code = code
        self.name = name
        self.continent = self.create_continent_dto(continent)

    def to_dict(self) -> Dict[str, str]:
        return {
            "guid": self.guid,
            "code": self.code,
            "name": self.name,
            "continent": self.continent.to_dict() if self.continent else None,
        }
        
    @staticmethod
    def from_dict(data: Dict[str, str]) -> "CountryDTO":
        return CountryDTO(
            guid=data["guid"],
            code=data["code"],
            name=data["name"],
            continent=ContinentDTO.from_dict(data["continent"]) if data.get("continent") else None
        )
        
        
    def create_continent_dto(self, continent: Optional[Union[Dict, ContinentDTO]]) -> Optional[ContinentDTO]:
        if isinstance(continent, dict):
            return ContinentDTO(
                guid=continent.get("guid"),
                code=continent.get("code"),
                name=continent.get("name")
            )
        elif isinstance(continent, ContinentDTO):
            return continent
        return None
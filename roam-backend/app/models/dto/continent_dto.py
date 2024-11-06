from typing import Optional, Dict

class ContinentDTO:
    """DTO for continent details."""
    def __init__(self, guid: str, code: str, name: str) -> None:
        self.guid = guid
        self.code = code
        self.name = name

    def to_dict(self) -> Dict[str, str]:
        return {
            "guid": self.guid,
            "code": self.code,
            "name": self.name,
        }
        
    @staticmethod
    def from_dict(data: Dict[str, str]) -> "ContinentDTO":
        return ContinentDTO(
            guid=data["guid"],
            code=data["code"],
            name=data["name"]
        )
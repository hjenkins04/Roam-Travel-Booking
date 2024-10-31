from typing import List, Dict, Optional

class PopularDestinationDTO:
    def __init__(self, name: str, guid: str, image_path: str) -> None:
        self.name: str = name
        self.guid: str = guid
        self.image_path: str = image_path


    def to_dict(self) -> Dict[str, str]:
        return {
            "name": self.name,
            "guid": self.guid, 
            "image_path": self.image_path
        }
        
    @staticmethod
    def from_dict(data: Dict[str, str]) -> "PopularDestinationDTO":
        return PopularDestinationDTO(
            name=data.get("name", ""),
            guid=data.get("guid", ""),
            image_path=data.get("image_path", "")
        )
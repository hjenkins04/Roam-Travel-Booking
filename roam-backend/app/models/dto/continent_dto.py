from typing import Optional, Dict

class ContinentDTO:
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
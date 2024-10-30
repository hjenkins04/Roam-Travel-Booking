from typing import List, Dict, Optional

class LoginResponseDTO:
    def __init__(self, token: str, guid: str) -> None:
        self.token: str = token
        self.guid: str = guid


    def to_dict(self) -> Dict[str, str]:
        return {
            "token": self.token,
            "guid": self.guid
        }

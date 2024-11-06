from typing import List, Dict, Optional

class LoginResponseDTO:
    """DTO for login response, containing user token and GUID."""
    def __init__(self, token: str, guid: str) -> None:
        self.token: str = token
        self.guid: str = guid


    def to_dict(self) -> Dict[str, str]:
        return {
            "token": self.token,
            "guid": self.guid
        }
        
    @staticmethod
    def from_dict(data: Dict[str, str]) -> "LoginResponseDTO":
        return LoginResponseDTO(
            token=data.get("token", ""),
            guid=data.get("guid", "")
        )

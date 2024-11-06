from typing import List, Dict, Optional

class UserDTO:
    """DTO for user information, including contact details and password."""
    def __init__(self, guid: str, first_name: str, last_name: str, email: str, phone: Optional[str], password: Optional[str] = None) -> None:
        self.guid: str = guid
        self.first_name: str = first_name
        self.last_name: str = last_name
        self.email: str = email
        self.phone: Optional[str] = phone
        self.password: Optional[str] = password

    def to_dict(self) -> Dict[str, str]:
        return {
            "guid": self.guid,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone": self.phone
        }
        
    @staticmethod
    def from_dict(data: Dict[str, Optional[str]]) -> "UserDTO":
        return UserDTO(
            guid=data["guid"],
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=data["email"],
            phone=data.get("phone"),
            password=data.get("password")
        )

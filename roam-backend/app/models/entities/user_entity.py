import uuid
from typing import List, Dict, Optional
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from app.models.dto.user_dto import UserDTO

class UserEntity(db.Model):
    __tablename__ = 'users'
    guid: str = db.Column(db.String(36), primary_key=True, unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    first_name: str = db.Column(db.String(50), nullable=False)
    last_name: str = db.Column(db.String(50), nullable=False)
    email: str = db.Column(db.String(120), unique=True, nullable=False)
    phone: Optional[str] = db.Column(db.String(15), nullable=True)
    password_hash: str = db.Column(db.String(128), nullable=False)

    def set_password(self, password: str) -> None:
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password_hash, password)
    
    def to_dto(self) -> UserDTO:
        """Convert the UserEntity to a UserDTO."""
        return UserDTO(
            guid=self.guid,
            first_name=self.first_name,
            last_name=self.last_name,
            email=self.email,
            phone=self.phone,
        )
        
    @staticmethod
    def from_dto(dto: UserDTO, password: Optional[str] = None) -> "UserEntity":
        """Convert a UserDTO to a UserEntity."""
        entity = UserEntity(
            guid=dto.guid,
            first_name=dto.first_name,
            last_name=dto.last_name,
            email=dto.email,
            phone=dto.phone,
        )
        if password:
            entity.set_password(password)
        return entity

        

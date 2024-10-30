from typing import List, Dict, Optional
from app import db
import uuid
from app.models.entities.user_entity import UserEntity
from app.models.dto.user_dto import UserDTO


class UserRepository:
    @staticmethod
    def add(user_dto: UserDTO) -> None:
        """Add a new user to the database."""
        user_entity = UserEntity.from_dto(user_dto, password=user_dto.password)
        db.session.add(user_entity)
        db.session.commit()

    @staticmethod
    def update_user(guid: uuid.UUID, email: Optional[str] = None, phone: Optional[str] = None,
                    first_name: Optional[str] = None, last_name: Optional[str] = None, password: Optional[str] = None) -> None:
        user = UserRepository.find_by_id(guid)
        if not user:
            raise ValueError("User not found.")
        if email: 
            user.email = email
        if phone: 
            user.phone = phone
        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        if password:
            user.set_password(password)
        db.session.commit()

    @staticmethod
    def get_all() -> List[UserEntity]:
        """Retrieve all users from the database."""
        return UserEntity.query.all()

    @staticmethod
    def find_by_email(email: str) -> Optional[UserEntity]:
        """Find a user by their email address."""
        return UserEntity.query.filter_by(email=email).first()
    
    @staticmethod
    def find_by_id(guid: uuid) -> Optional[UserEntity]:
        """Find a user by their unique ID."""
        return UserEntity.query.filter_by(guid=guid).first()
    
    @staticmethod
    def delete_user(guid: uuid) -> bool:
        """Delete a user by their ID."""
        user = UserRepository.find_by_id(guid)
        if user:
            db.session.delete(user)
            db.session.commit()
            return True
        return False
    
    @staticmethod
    def email_exists(email: str) -> bool:
        """Check if an email already exists in the database."""
        return db.session.query(UserEntity.query.filter_by(email=email).exists()).scalar()
    

from typing import List, Dict, Optional
from app import db
import uuid
from app.models.entities.user_entity import UserEntity


class UserRepository:
    @staticmethod
    def add(user_entity: UserEntity) -> None:
        db.session.add(user_entity)
        db.session.commit()

    @staticmethod
    def get_all() -> List[UserEntity]:
        return UserEntity.query.all()

    @staticmethod
    def find_by_email(email: str) -> Optional[UserEntity]:
        return UserEntity.query.filter_by(email=email).first()
    
    @staticmethod
    def find_by_id(user_id: uuid) -> Optional[UserEntity]:
        return UserEntity.query.filter_by(id=user_id).first()
    
    @staticmethod
    def delete_user(user_id: uuid) -> bool:
        """Delete a user by their ID."""
        user = UserRepository.find_by_id(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return True
        return False
    
    @staticmethod
    def email_exists(email: str) -> bool:
        """Check if an email already exists in the database."""
        return db.session.query(UserEntity.query.filter_by(email=email).exists()).scalar()
    

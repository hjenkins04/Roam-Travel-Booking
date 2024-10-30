import uuid
from typing import List, Dict, Optional
from app.repositories.user_repository import UserRepository
from app.models.dto.user_dto import UserDTO
from app.models.entities.user_entity import UserEntity
import jwt
from datetime import datetime, timedelta, timezone
from flask import current_app
from app.models.dto.login_response_dto import LoginResponseDTO

class UserService:
    @staticmethod
    def create_user(email: str, phone: Optional[str], first_name: str, last_name: str, password: str) -> None:
        if UserRepository.find_by_email(email):
            raise ValueError("Email already exists.")

        user_dto = UserDTO(
            guid=str(uuid.uuid4()),
            email=email,
            phone=phone,
            first_name=first_name,
            last_name=last_name
        )
        user_entity = UserEntity.from_dto(user_dto, password=password)
        UserRepository.add(user_entity)

    @staticmethod
    def update_user(guid: uuid.UUID, email: Optional[str] = None, phone: Optional[str] = None,
                    first_name: Optional[str] = None, last_name: Optional[str] = None, password: Optional[str] = None) -> None:
        UserRepository.update_user(guid=guid, email=email, phone=phone, first_name=first_name, last_name=last_name, password=password)
        
    @staticmethod
    def login(email: str, password: str) -> LoginResponseDTO:
        user = UserRepository.find_by_email(email)
        if not user or not user.check_password(password):
            raise ValueError("Invalid email or password.")

        # Generate JWT token
        token = UserService.generate_jwt(user.guid)
        return LoginResponseDTO(token, user.guid)
    
    
    @staticmethod
    def generate_jwt(user_guid: str) -> str:
        expiration = datetime.now(timezone.utc) + timedelta(hours=1)  # Token valid for 1 hour
        payload = {
            "sub": user_guid,
            "exp": expiration
        }
        return jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm="HS256")

    @staticmethod
    def get_all_users() -> List[UserDTO]:
        users = UserRepository.get_all()
        return [user.to_dto() for user in users]
    
    @staticmethod
    def get_user_by_id(user_id: uuid) -> UserDTO:
        user = UserRepository.find_by_id(user_id)
        if user is None:
            raise ValueError("User not found.")
        return user.to_dto()

    @staticmethod
    def delete_user(user_id: uuid.UUID) -> None:
        success = UserRepository.delete_user(user_id)
        if not success:
            raise ValueError("User not found.")
    
    @staticmethod
    def email_exists(email: str) -> bool:
        return UserRepository.email_exists(email)

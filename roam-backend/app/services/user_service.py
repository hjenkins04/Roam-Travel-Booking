from typing import List, Optional
from app.repositories.user_repository import UserRepository
from app.models.dto.user_dto import UserDTO
from app.models.entities.user_entity import UserEntity
import jwt
import uuid
from datetime import datetime, timedelta, timezone
from flask import current_app
from app.models.dto.login_response_dto import LoginResponseDTO

class UserService:
    @staticmethod
    def create_user(user_dto: UserDTO) -> None:
        if UserRepository.find_by_email(user_dto.email):
            raise ValueError("Email already exists.")
        UserRepository.add(user_dto)

    @staticmethod
    def update_user(user_dto: UserDTO) -> None:
        UserRepository.update_user(
            guid=user_dto.guid,
            email=user_dto.email,
            phone=user_dto.phone,
            first_name=user_dto.first_name,
            last_name=user_dto.last_name,
            password=user_dto.password
        )

    @staticmethod
    def login(email: str, password: str) -> LoginResponseDTO:
        user = UserRepository.find_by_email(email)
        if not user or not user.check_password(password):
            raise ValueError("Invalid email or password.")
        token = UserService.generate_jwt(user.guid)
        return LoginResponseDTO(token=token, guid=user.guid)
    
    @staticmethod
    def generate_jwt(user_guid: str) -> str:
        expiration = datetime.now(timezone.utc) + timedelta(hours=1)
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
    def get_user_by_id(user_id: uuid.UUID) -> UserDTO:
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

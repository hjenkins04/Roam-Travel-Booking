import uuid
from typing import List, Dict, Optional
from app.repositories.user_repository import UserRepository
from app.models.dto.user_dto import UserDTO
from app.models.entities.user_entity import UserEntity

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

import uuid
from typing import Optional
from app import db
from app.models.dto.pop_destination_dto import PopularDestinationDTO

class PopularDestinationEntity(db.Model):
    __tablename__ = 'popular_destinations'
    guid: str = db.Column(db.String(36), primary_key=True, unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    name: str = db.Column(db.String(100), nullable=False)
    image_path: str = db.Column(db.String(255), nullable=True)

    def to_dto(self) -> PopularDestinationDTO:
        return PopularDestinationDTO(
            guid=self.guid,
            name=self.name,
            image_path=self.image_path
        )
        
    @staticmethod
    def from_dto(dto: "PopularDestinationDTO") -> "PopularDestinationEntity":
        return PopularDestinationEntity(
            guid=dto.guid,
            name=dto.name,
            image_path=dto.image_path
        )
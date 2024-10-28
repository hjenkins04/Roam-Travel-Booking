import uuid
from typing import Optional
from app import db
from app.models.dto.continent_dto import ContinentDTO

class ContinentEntity(db.Model):
    __tablename__ = 'continents'
    guid: str = db.Column(db.String(36), primary_key=True, unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    code: str = db.Column(db.String(2), unique=True, nullable=False)
    name: str = db.Column(db.String(50), unique=True, nullable=False)

    airports = db.relationship("AirportEntity", back_populates="continent")
    
    def to_dto(self) -> ContinentDTO:
        return ContinentDTO(
            guid=self.guid,
            code=self.code,
            name=self.name
        )
        
    @staticmethod
    def from_dto(dto: "ContinentDTO") -> "ContinentEntity":
        return ContinentEntity(
            guid=dto.guid,
            code=dto.code,
            name=dto.name
        )
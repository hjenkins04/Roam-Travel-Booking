import uuid
from typing import Optional
from app import db
from app.models.dto.country_dto import CountryDTO
from app.models.dto.country_dto import CountryDTO

class CountryEntity(db.Model):
    __tablename__ = 'countries'
    guid: str = db.Column(db.String(36), primary_key=True, unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    code: str = db.Column(db.String(2), unique=True, nullable=False)
    name: str = db.Column(db.String(100), nullable=False)
    
    airports = db.relationship("AirportEntity", back_populates="country")
    
    def to_dto(self) -> CountryDTO:
        return CountryDTO(
            guid=self.guid,
            code=self.code,
            name=self.name
        )
        
    @staticmethod
    def from_dto(dto: "CountryDTO") -> "CountryEntity":
        return CountryEntity(
            guid=dto.guid,
            code=dto.code,
            name=dto.name
        )
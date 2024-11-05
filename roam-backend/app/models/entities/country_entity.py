import uuid
from typing import Optional
from app import db
from app.models.entities.continent_entity import ContinentEntity
from app.models.dto.country_dto import CountryDTO
from app.models.dto.continent_dto import ContinentDTO

class CountryEntity(db.Model):
    """Represents a country with a unique code and name, linked to a continent and associated airports."""
    __tablename__ = 'countries'
    guid: str = db.Column(db.String(36), primary_key=True, unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    code: str = db.Column(db.String(2), unique=True, nullable=False)
    name: str = db.Column(db.String(100), nullable=False)
    continent_id: str = db.Column(db.String(36), db.ForeignKey('continents.guid'), nullable=False)
    
    continent = db.relationship("ContinentEntity", back_populates="countries")
    airports = db.relationship("AirportEntity", back_populates="country", cascade="all, delete-orphan")
    
    def to_dto(self) -> CountryDTO:
        return CountryDTO(
            guid=self.guid,
            code=self.code,
            name=self.name,
            continent=ContinentDTO(guid=self.continent.guid, code=self.continent.code, name=self.continent.name) if self.continent else None,
        )
        
    @staticmethod
    def from_dto(dto: "CountryDTO") -> "CountryEntity":
        # Check for continent and create it if it doesn't exist
        continent = None
        if dto.continent:
            continent = ContinentEntity.query.filter_by(code=dto.continent.code).first()
            if not continent:
                continent = ContinentEntity(guid=dto.continent.guid, code=dto.continent.code, name=dto.continent.name)
                db.session.add(continent)
                db.session.flush()
        
        return CountryEntity(
            guid=dto.guid,
            code=dto.code,
            name=dto.name,
            continent=continent,
            continent_id=continent.guid if continent else None
        )
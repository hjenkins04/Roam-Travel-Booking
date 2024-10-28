import uuid
from typing import Optional
from app import db
from app.models.entities.country_entity import CountryEntity
from app.models.entities.continent_entity import ContinentEntity
from app.models.entities.location_entity import LocationEntity
from app.models.dto.airport_dto import AirportDTO
from app.models.dto.location_dto import LocationDTO
from app.models.dto.country_dto import CountryDTO
from app.models.dto.continent_dto import ContinentDTO

class AirportEntity(db.Model):
    __tablename__ = 'airports'
    guid: str = db.Column(db.String(36), primary_key=True, unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    full_name: str = db.Column(db.String(100), nullable=False)
    short_name: str = db.Column(db.String(100), nullable=False)
    municipality_name: str = db.Column(db.String(100), nullable=False)
    iata_code: Optional[str] = db.Column(db.String(3), unique=True, nullable=True)
    
    # Foreign keys for Location, Country, and Continent
    location_id: str = db.Column(db.String(36), db.ForeignKey('locations.guid'), nullable=False)
    country_id: str = db.Column(db.String(36), db.ForeignKey('countries.guid'), nullable=False)
    continent_id: str = db.Column(db.String(36), db.ForeignKey('continents.guid'), nullable=False)
    
    # Relationships
    location = db.relationship("LocationEntity", back_populates="airports")
    country = db.relationship("CountryEntity", back_populates="airports")
    continent = db.relationship("ContinentEntity", back_populates="airports")
    
    def to_dto(self) -> AirportDTO:
        return AirportDTO(
            guid=self.guid,
            full_name=self.full_name,
            short_name=self.short_name,
            municipality_name=self.municipality_name,
            iata_code=self.iata_code,
            location=LocationDTO(guid=self.location.guid, latitude=self.location.latitude, longitude=self.location.longitude) if self.location else None,
            country=CountryDTO(guid=self.country.guid, code=self.country.code, name=self.country.name) if self.country else None,
            continent=ContinentDTO(guid=self.continent.guid, code=self.continent.code, name=self.continent.name) if self.continent else None,
        )
        
    @staticmethod
    def from_dto(dto: "AirportDTO") -> "AirportEntity":
        # Check for country and create it if it doesn't exist
        if dto.country:
            country = CountryEntity.query.filter_by(code=dto.country.code).first()
            if not country:
                country = CountryEntity(guid=dto.country.guid, code=dto.country.code, name=dto.country.name)
                db.session.add(country)

        # Check for continent and create it if it doesn't exist
        if dto.continent:
            continent = ContinentEntity.query.filter_by(code=dto.continent.code).first()
            if not continent:
                continent = ContinentEntity(guid=dto.continent.guid, code=dto.continent.code, name=dto.continent.name)
                db.session.add(continent)
        
        # Check for location and create it if it doesn't exist
        if dto.location:
            location = LocationEntity.query.filter_by(latitude=dto.location.latitude, longitude=dto.location.longitude).first()
            if not location:
                location = LocationEntity(guid=dto.location.guid, latitude=dto.location.latitude, longitude=dto.location.longitude)
                db.session.add(location)

        db.session.commit()

        return AirportEntity(
            guid=dto.guid,
            full_name=dto.full_name,
            short_name=dto.short_name,
            municipality_name=dto.municipality_name,
            iata_code=dto.iata_code,
            location=location,
            country=country,
            continent=continent
        )

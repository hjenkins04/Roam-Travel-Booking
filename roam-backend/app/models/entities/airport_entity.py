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
    
    # Relationships
    location = db.relationship("LocationEntity", back_populates="airports")
    country = db.relationship("CountryEntity", back_populates="airports")
    
    departure_flights = db.relationship("FlightEntity", foreign_keys="[FlightEntity.departure_airport_id]", back_populates="departure_airport", cascade="all, delete-orphan")
    arrival_flights = db.relationship("FlightEntity", foreign_keys="[FlightEntity.arrival_airport_id]", back_populates="arrival_airport", cascade="all, delete-orphan")
    
    def to_dto(self) -> AirportDTO:
        return AirportDTO(
            guid=self.guid,
            full_name=self.full_name,
            short_name=self.short_name,
            municipality_name=self.municipality_name,
            iata_code=self.iata_code,
            location=LocationDTO(guid=self.location.guid, latitude=self.location.latitude, longitude=self.location.longitude) if self.location else None,
            country=CountryDTO(guid=self.country.guid, code=self.country.code, name=self.country.name, continent=self.country.continent.to_dto()) if self.country else None
        )
        
    @staticmethod
    def from_dto(dto: "AirportDTO") -> "AirportEntity":
        # Check for country and create it if it doesn't exist
        country = None
        if dto.country:
            country = CountryEntity.query.filter_by(guid=dto.country.guid).first()
            if not country:
                # Check if the continent exists and create it if it does not
                continent = None
                if dto.country.continent:
                    continent = ContinentEntity.query.filter_by(guid=dto.country.continent.guid).first()
                    if not continent:
                        continent = ContinentEntity(guid=dto.country.continent.guid, code=dto.country.continent.code, name=dto.country.continent.name)
                        db.session.add(continent)
                        db.session.flush()

                # Create the country and link it with the continent
                country = CountryEntity(guid=dto.country.guid, code=dto.country.code, name=dto.country.name, continent=continent)
                db.session.add(country)
                db.session.flush() 
        
        # Check for location and create it if it doesn't exist
        location = None
        if dto.location:
            location = LocationEntity.query.filter_by(guid=dto.location.guid).first()
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
        )

import uuid
from typing import Optional
from app import db
from app.models.dto.location_dto import LocationDTO

class LocationEntity(db.Model):
    """Represents a geographical location with latitude and longitude coordinates."""
    __tablename__ = 'locations'
    guid: str = db.Column(db.String(36), primary_key=True, unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    latitude: float = db.Column(db.Float, nullable=False)
    longitude: float = db.Column(db.Float, nullable=False)
    
    airports = db.relationship("AirportEntity", back_populates="location", cascade="all, delete-orphan")
    
    def to_dto(self) -> LocationDTO:
        return LocationDTO(
            guid=self.guid,
            latitude=self.latitude,
            longitude=self.longitude
        )
        
    @staticmethod
    def from_dto(dto: "LocationDTO") -> "LocationEntity":
        return LocationEntity(
            guid=dto.guid,
            latitude=dto.latitude,
            longitude=dto.longitude
        )
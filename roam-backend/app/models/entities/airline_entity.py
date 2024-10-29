import uuid
from typing import Optional
from app import db
from app.models.dto.airline_dto import AirlineDTO

class AirlineEntity(db.Model):
    __tablename__ = 'airlines'
    guid: str = db.Column(db.String(36), primary_key=True, unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    icao_code: Optional[str] = db.Column(db.String(4), unique=True, nullable=True)
    name: str = db.Column(db.String(100), nullable=False)
    logo_path: str = db.Column(db.String(255), nullable=True)

    # Relationship to Flights
    flights = db.relationship("FlightEntity", back_populates="airline")
    
    
    def to_dto(self) -> AirlineDTO:
        return AirlineDTO(
            guid=self.guid,
            icao_code=self.icao_code,
            name=self.name,
            logo_path=self.logo_path
        )

    @staticmethod
    def from_dto(dto: AirlineDTO) -> "AirlineEntity":
        return AirlineEntity(
            guid=dto.guid,
            icao_code=dto.icao_code,
            name=dto.name,
            logo_path=dto.logo_path
        )

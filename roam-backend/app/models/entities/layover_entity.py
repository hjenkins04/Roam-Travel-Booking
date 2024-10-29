import uuid
from app import db
from app.models.dto.layover_dto import LayoverDTO
from app.models.entities.airport_entity import AirportEntity

class LayoverEntity(db.Model):
    __tablename__ = 'layovers'
    guid: str = db.Column(db.String(36), primary_key=True, unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    
    # Foreign keys
    flight_id: str = db.Column(db.String(36), db.ForeignKey('flights.guid'), unique=True, nullable=False)
    airport_id: str = db.Column(db.String(36), db.ForeignKey('airports.guid'), nullable=False)
    
    # Layover details
    duration_minutes: int = db.Column(db.Integer, nullable=False)

    # Relationships
    flight = db.relationship("FlightEntity", back_populates="layover")
    airport = db.relationship("AirportEntity")
    
    
    def to_dto(self) -> LayoverDTO:
        return LayoverDTO(
            guid=self.guid,
            airport=self.airport.to_dto(),
            duration_minutes=self.duration_minutes
        )

    @staticmethod
    def from_dto(dto: LayoverDTO) -> "LayoverEntity":
        # Check for airport and create it if it doesn't exist
        if dto.airport:
            airport = AirportEntity.query.filter_by(guid=dto.airport.guid).first()
            if not airport:
                airport = AirportEntity.from_dto(dto.airport)
                
        layover = LayoverEntity(
            guid=dto.guid,
            airport=airport,
            duration_minutes=dto.duration_minutes
        )
        
        db.session.commit()
        return layover

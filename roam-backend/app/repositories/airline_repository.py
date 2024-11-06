from typing import List, Optional
from app import db
from app.models.entities.airline_entity import AirlineEntity
from app.models.dto.airline_dto import AirlineDTO

class AirlineRepository:
    @staticmethod
    def add(airline_dto: "AirlineDTO") -> None:
        """Add an airport to the database, creating and or linking the country, continent, and location as needed."""
        # Convert DTO to AirlineEntity and create or link associated entities if needed
        airline_entity = AirlineEntity.from_dto(airline_dto)
        
        db.session.add(airline_entity)
        db.session.commit()
        
    @staticmethod
    def get_all() -> List[AirlineEntity]:
        """Retrieve all airports from the database."""
        return AirlineEntity.query.all()

    @staticmethod
    def get_by_guid(guid: str) -> Optional[AirlineEntity]:
        """Retrieve an airport by its GUID."""
        return AirlineEntity.query.filter_by(guid=guid).first()

    @staticmethod
    def find_by_icao_code(icao_code: str) -> Optional[AirlineEntity]:
        """Find an airport by its IATA code."""
        return AirlineEntity.query.filter_by(icao_code=icao_code).first()
    
    @staticmethod
    def delete_airline(guid: str) -> bool:
        """Delete an airport by its GUID."""
        airline = AirlineRepository.get_by_guid(guid)
        if airline:
            db.session.delete(airline)
            db.session.commit()
            return True
        return False


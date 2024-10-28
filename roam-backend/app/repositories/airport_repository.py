from typing import List, Optional
from app import db
from app.models.entities.airport_entity import AirportEntity
from app.models.entities.country_entity import CountryEntity
from app.models.dto.airport_dto import AirportDTO

class AirportRepository:
    @staticmethod
    def add(airport_dto: "AirportDTO") -> None:
        """Add an airport to the database, creating and or linking the country, continent, and location as needed."""
        # Convert DTO to AirportEntity and create or link associated entities if needed
        airport_entity = AirportEntity.from_dto(airport_dto)
        
        db.session.add(airport_entity)
        db.session.commit()
        
    @staticmethod
    def get_all() -> List[AirportEntity]:
        """Retrieve all airports from the database."""
        return AirportEntity.query.all()

    @staticmethod
    def get_by_guid(guid: str) -> Optional[AirportEntity]:
        """Retrieve an airport by its GUID."""
        return AirportEntity.query.filter_by(guid=guid).first()

    @staticmethod
    def find_by_iata_code(iata_code: str) -> Optional[AirportEntity]:
        """Find an airport by its IATA code."""
        return AirportEntity.query.filter_by(iata_code=iata_code).first()

    @staticmethod
    def find_by_country_code(country_code: str) -> List[AirportEntity]:
        """Find all airports in a specific country using the country code."""
        return AirportEntity.query.join(CountryEntity).filter(CountryEntity.code == country_code).all()

    @staticmethod
    def delete_airport(guid: str) -> bool:
        """Delete an airport by its GUID."""
        airport = AirportRepository.get_by_guid(guid)
        if airport:
            db.session.delete(airport)
            db.session.commit()
            return True
        return False


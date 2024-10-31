from typing import List, Optional
from app import db
from app.models.entities.pop_destination_entity import PopularDestinationEntity
from app.models.dto.pop_destination_dto import PopularDestinationDTO
import random
class PopularDestinationRepository:
    @staticmethod
    def add(pop_destination_dto: "PopularDestinationDTO") -> None:
        """Add an airport to the database, creating and or linking the country, continent, and location as needed."""
        # Convert DTO to AirportEntity and create or link associated entities if needed
        pop_destination_entity = PopularDestinationEntity.from_dto(pop_destination_dto)
        
        db.session.add(pop_destination_entity)
        db.session.commit()
        
    @staticmethod
    def get_all() -> List[PopularDestinationEntity]:
        """Retrieve all destinations from the database."""
        return PopularDestinationEntity.query.all()
    
    @staticmethod
    def get_popular_destinations(limit: int = 5) -> List[PopularDestinationEntity]:
        """Retrieve the top N popular destinations from the database."""
        all_destinations = PopularDestinationEntity.query.all()
        return random.sample(all_destinations, limit)
    
    @staticmethod
    def get_by_guid(guid: str) -> Optional[PopularDestinationEntity]:
        """Retrieve a destination by its GUID."""
        return PopularDestinationEntity.query.filter_by(guid=guid).first()


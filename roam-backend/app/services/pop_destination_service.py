from typing import List, Optional
from app.repositories.pop_destination_repository import PopularDestinationRepository
from app.models.dto.pop_destination_dto import PopularDestinationDTO
from app.models.entities.pop_destination_entity import PopularDestinationEntity
import random 

class PopularDestinationService:
    @staticmethod
    def add_destination(pop_destination_dto: PopularDestinationDTO) -> None:
        """Add a popular destination to the database."""
        PopularDestinationRepository.add(pop_destination_dto)

    @staticmethod
    def get_all_destinations() -> List[PopularDestinationEntity]:
        """Retrieve all popular destinations."""
        return PopularDestinationRepository.get_all()

    @staticmethod
    def get_random_popular_destinations(limit: int = 5) -> List[PopularDestinationEntity]:
        """Retrieve random popular destinations."""
        all_destinations = PopularDestinationRepository.get_popular_destinations()
        # Ensure we don't exceed the available number of destinations
        if limit > len(all_destinations):
            limit = len(all_destinations)
        return random.sample(all_destinations, limit)  # Randomly select from available destinations

    @staticmethod
    def get_destination_by_guid(guid: str) -> Optional[PopularDestinationEntity]:
        """Retrieve a destination by its GUID."""
        return PopularDestinationRepository.get_by_guid(guid)
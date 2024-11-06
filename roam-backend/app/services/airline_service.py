from typing import List, Optional
from app.models.dto.airline_dto import AirlineDTO
from app.repositories.airline_repository import AirlineRepository
from app.models.entities.airline_entity import AirlineEntity

class AirlineService:
    @staticmethod
    def create_airline(airline_dto: AirlineDTO) -> AirlineEntity:
        """Create a new airport and add it to the database."""
        AirlineRepository.add(airline_dto)
        return AirlineRepository.get_by_guid(airline_dto.guid)

    @staticmethod
    def get_all_airlines() -> List[AirlineEntity]:
        """Retrieve all airports from the database."""
        return AirlineRepository.get_all()

    @staticmethod
    def get_airline_by_id(guid: str) -> Optional[AirlineEntity]:
        """Retrieve an airport by its GUID."""
        return AirlineRepository.get_by_guid(guid)

    @staticmethod
    def get_airline_by_icao_code(icao_code: str) -> Optional[AirlineEntity]:
        """Retrieve an airport by its IATA code."""
        return AirlineRepository.find_by_icao_code(icao_code)

    @staticmethod
    def delete_airline(guid: str) -> bool:
        """Delete an airport by its GUID."""
        return AirlineRepository.delete_airline(guid)

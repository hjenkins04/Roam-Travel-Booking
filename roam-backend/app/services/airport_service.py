from typing import List, Optional
from app.models.dto.airport_dto import AirportDTO
from app.repositories.airport_repository import AirportRepository
from app.models.entities.airport_entity import AirportEntity

class AirportService:
    @staticmethod
    def create_airport(airport_dto: AirportDTO) -> AirportEntity:
        """Create a new airport and add it to the database."""
        AirportRepository.add(airport_dto)
        return AirportRepository.get_by_guid(airport_dto.guid)

    @staticmethod
    def get_all_airports() -> List[AirportEntity]:
        """Retrieve all airports from the database."""
        return AirportRepository.get_all()

    @staticmethod
    def get_airport_by_id(guid: str) -> Optional[AirportEntity]:
        """Retrieve an airport by its GUID."""
        return AirportRepository.get_by_guid(guid)

    @staticmethod
    def get_airport_by_iata_code(iata_code: str) -> Optional[AirportEntity]:
        """Retrieve an airport by its IATA code."""
        return AirportRepository.find_by_iata_code(iata_code)

    @staticmethod
    def get_all_airports_by_country_code(country_code: str) -> List[AirportEntity]:
        """Retrieve all airports in a specified country using the country code."""
        return AirportRepository.find_by_country_code(country_code)

    @staticmethod
    def delete_airport(guid: str) -> bool:
        """Delete an airport by its GUID."""
        return AirportRepository.delete_airport(guid)

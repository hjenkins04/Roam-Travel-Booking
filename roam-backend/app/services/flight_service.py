from typing import List, Optional
from app.models.dto.flight_dto import FlightDTO
from app.repositories.flight_repository import FlightRepository
from app.models.entities.flight_entity import FlightEntity

class FlightService:
    @staticmethod
    def create_flight(flight_dto: FlightDTO) -> FlightEntity:
        """Create a new flight and add it to the database."""
        FlightRepository.add(flight_dto)
        return FlightRepository.get_by_guid(flight_dto.guid)

    @staticmethod
    def get_all_flights() -> List[FlightEntity]:
        """Retrieve all flights from the database."""
        return FlightRepository.get_all()

    @staticmethod
    def get_flight_by_id(guid: str) -> Optional[FlightEntity]:
        """Retrieve a flight by its GUID."""
        return FlightRepository.get_by_guid(guid)

    @staticmethod
    def get_flights_by_destination_id(destination_id: str) -> List[FlightEntity]:
        """Retrieve all flights arriving at a specific airport ID."""
        return FlightRepository.find_by_destination_id(destination_id)

    @staticmethod
    def get_flights_by_departure_id(departure_id: str) -> List[FlightEntity]:
        """Retrieve all flights departing from a specific airport ID."""
        return FlightRepository.find_by_departure_id(departure_id)

    @staticmethod
    def get_flights_by_airline_id(airline_id: str) -> List[FlightEntity]:
        """Retrieve all flights by a specific airline."""
        return FlightRepository.find_by_airline_id(airline_id)

    @staticmethod
    def delete_flight(guid: str) -> bool:
        """Delete a flight by its GUID."""
        return FlightRepository.delete_flight(guid)

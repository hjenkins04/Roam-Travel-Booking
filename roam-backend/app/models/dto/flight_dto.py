from typing import Optional, Dict, Union, List
from app.models.dto.airline_dto import AirlineDTO
from app.models.dto.airport_dto import AirportDTO
from app.models.dto.layover_dto import LayoverDTO

class FlightDTO:
    def __init__(self, guid: str, airline: Union[Dict, AirlineDTO], departure_airport: Union[Dict, AirportDTO],
                 arrival_airport: Union[Dict, AirportDTO], flight_time_minutes: int,
                 seat_configuration_id: str = None,
                 layover: Optional[Union[Dict, LayoverDTO]] = None,) -> None:
        self.guid = guid
        self.airline = self.create_airline_dto(airline)
        self.departure_airport = self.create_airport_dto(departure_airport)
        self.arrival_airport = self.create_airport_dto(arrival_airport)
        self.flight_time_minutes = flight_time_minutes
        self.layover = self.create_layover_dto(layover)
        self.seat_configuration_id = seat_configuration_id

    def to_dict(self) -> Dict[str, Optional[Dict]]:
        return {
            "guid": self.guid,
            "airline": self.airline.to_dict() if self.airline else None,
            "departure_airport": self.departure_airport.to_dict() if self.departure_airport else None,
            "arrival_airport": self.arrival_airport.to_dict() if self.arrival_airport else None,
            "flight_time_minutes": self.flight_time_minutes,
            "seat_configuration_id": self.seat_configuration_id,
            "layover": self.layover.to_dict() if self.layover else None
        }

    def create_airline_dto(self, airline: Union[Dict, AirlineDTO]) -> AirlineDTO:
        if isinstance(airline, dict):
            return AirlineDTO(
                guid=airline.get("guid"),
                icao_code=airline.get("icao_code"),
                name=airline.get("name"),
                logo_path=airline.get("logo_path")
            )
        elif isinstance(airline, AirlineDTO):
            return airline
        return None

    def create_airport_dto(self, airport: Union[Dict, AirportDTO]) -> AirportDTO:
        if isinstance(airport, dict):
            return AirportDTO(
                guid=airport.get("guid"),
                full_name=airport.get("full_name"),
                short_name=airport.get("short_name"),
                municipality_name=airport.get("municipality_name"),
                iata_code=airport.get("iata_code"),
                location=airport.get("location"),
                country=airport.get("country"),
                continent=airport.get("continent")
            )
        elif isinstance(airport, AirportDTO):
            return airport
        return None

    def create_layover_dto(self, layover: Optional[Union[Dict, LayoverDTO]]) -> Optional[LayoverDTO]:
        if isinstance(layover, dict):
            return LayoverDTO(
                guid=layover.get("guid"),
                airport=self.create_airport_dto(layover.get("airport")),
                duration_minutes=layover.get("duration_minutes")
            )
        elif isinstance(layover, LayoverDTO):
            return layover
        return None

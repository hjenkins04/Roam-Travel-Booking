from typing import Optional, Dict, Union, List
from app.models.dto.airline_dto import AirlineDTO
from app.models.dto.airport_dto import AirportDTO
from app.models.dto.layover_dto import LayoverDTO

class FlightDTO:
    """DTO for flight details, including airline, airports, and layover."""
    def __init__(self, guid: str, departure_time: str, arrival_time: str, num_stops: int,
                 price_economy: float, price_business:float, baggage_allowance: str,
                 airline: Union[Dict, AirlineDTO], departure_airport: Union[Dict, AirportDTO],
                 arrival_airport: Union[Dict, AirportDTO], flight_time_minutes: int,
                 seat_configuration_id: str = None,
                 layover: Optional[Union[Dict, LayoverDTO]] = None,) -> None:
        self.guid = guid
        self.flight_time_minutes = flight_time_minutes
        self.departure_time = departure_time
        self.arrival_time = arrival_time
        self.num_stops = num_stops
        self.price_economy = price_economy
        self.price_business = price_business
        self.baggage_allowance = baggage_allowance
        self.airline = self.create_airline_dto(airline)
        self.departure_airport = self.create_airport_dto(departure_airport)
        self.arrival_airport = self.create_airport_dto(arrival_airport)
        self.layover = self.create_layover_dto(layover)
        self.seat_configuration_id = seat_configuration_id

    def to_dict(self) -> Dict[str, Optional[Dict]]:
        return {
            "guid": self.guid,
            "flight_time_minutes": self.flight_time_minutes,
            "departure_time": self.departure_time,
            "arrival_time": self.arrival_time,
            "num_stops": self.num_stops,
            "price_economy": self.price_economy,
            "price_business": self.price_business,
            "baggage_allowance": self.baggage_allowance,
            "airline": self.airline.to_dict() if self.airline else None,
            "departure_airport": self.departure_airport.to_dict() if self.departure_airport else None,
            "arrival_airport": self.arrival_airport.to_dict() if self.arrival_airport else None,
            "layover": self.layover.to_dict() if self.layover else None,
            "seat_configuration_id": self.seat_configuration_id,
        }
        
    @staticmethod
    def from_dict(data: Dict[str, Union[str, int, float, Dict]]) -> "FlightDTO":
        return FlightDTO(
            guid=data["guid"],
            flight_time_minutes=data["flight_time_minutes"],
            departure_time=data["departure_time"],
            arrival_time=data["arrival_time"],
            num_stops=data["num_stops"],
            price_economy=data["price_economy"],
            price_business=data["price_business"],
            baggage_allowance=data["baggage_allowance"],
            airline=AirlineDTO.from_dict(data["airline"]) if data.get("airline") else None,
            departure_airport=AirportDTO.from_dict(data["departure_airport"]) if data.get("departure_airport") else None,
            arrival_airport=AirportDTO.from_dict(data["arrival_airport"]) if data.get("arrival_airport") else None,
            seat_configuration_id=data.get("seat_configuration_id"),
            layover=LayoverDTO.from_dict(data["layover"]) if data.get("layover") else None
        )


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

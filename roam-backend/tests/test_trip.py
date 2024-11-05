import pytest
from app import create_app, db
from app.models.dto.trip_dto import TripDTO
from app.models.entities.trip_entity import TripEntity
from app.models.entities.flight_entity import FlightEntity
from app.models.entities.airport_entity import AirportEntity
from app.models.dto.country_dto import CountryDTO
from app.models.dto.location_dto import LocationDTO
from app.models.dto.airport_dto import AirportDTO
from app.models.dto.flight_dto import FlightDTO
from app.models.dto.airline_dto import AirlineDTO
from app.models.entities.airline_entity import AirlineEntity
from app.models.entities.continent_entity import ContinentEntity
from app.models.entities.country_entity import CountryEntity

from datetime import date

@pytest.fixture
def setup_airport_flight():
    # Check if continent exists, create if not
    continent = ContinentEntity.query.filter_by(guid="cont123").first()
    if not continent:
        continent = ContinentEntity(guid="cont123", code="NA", name="North America")
        db.session.add(continent)

    # Check if country exists, create if not
    country = CountryEntity.query.filter_by(guid="country123").first()
    if not country:
        country = CountryEntity(guid="country123", code="USA", name="United States", continent=continent)
        db.session.add(country)

    test_airport = AirportEntity.query.filter_by(guid="test_airport123").first()
    if not test_airport:
        airport_dto = AirportDTO(
            guid="12345",
            full_name="Test Airport Full Name",
            short_name="Test Airport",
            municipality_name="Test City",
            iata_code="TPT",
            location=LocationDTO(guid="loc123", latitude=37.7749, longitude=-122.4194),
            country=CountryDTO(guid="country123", code="USA", name="United States", continent=None)
        )
        test_airport = AirportEntity.from_dto(airport_dto)
        db.session.add(test_airport)
    
    test_airline = AirlineEntity.query.filter_by(guid="test_airline123").first()
    if not test_airline:
        airline_dto = AirlineDTO(
            guid="test_airline123",
            icao_code="ICAO123",
            name="Test Airline",
            logo_path=None
        )
        test_airline = AirlineEntity.from_dto(airline_dto)
        db.session.add(test_airline)
    

    test_flight = FlightEntity.query.filter_by(guid="test_flight123").first()
    if not test_flight:
        flight_dto = FlightDTO(guid="test_flight123", 
                                flight_time_minutes=224, 
                                departure_time="10:30AM", 
                                arrival_time="2:14PM",
                                num_stops=1, 
                                price_economy=700.0, 
                                price_business=400.0, 
                                baggage_allowance="1 checked bag", 
                                airline=AirlineDTO(guid=test_airline.guid, icao_code=test_airline.icao_code, name=test_airline.name, logo_path=None),
                                arrival_airport=airport_dto,
                                departure_airport=airport_dto)
        test_flight = FlightEntity.from_dto(flight_dto) 
        db.session.add(test_flight)

    db.session.commit()

    yield

    db.session.delete(test_airport)
    db.session.delete(test_airline)
    db.session.delete(country)
    db.session.delete(continent)
    db.session.delete(test_flight)
    db.session.commit()

@pytest.fixture
def setup_trip(client, setup_airport_flight):
    """Fixture to create a test trip."""
    flight = FlightEntity.query.filter_by(guid="test_flight123").first()

    trip = TripEntity.query.filter_by(guid="trip123").first()
    if not trip:
        trip_dto = TripDTO(guid="trip123", 
                       name="Test Trip", 
                       is_round_trip=False, 
                       departure_date="2024-11-20", 
                       departing_flight=FlightDTO(guid=flight.guid, 
                                                  departure_time=flight.departure_time, 
                                                  arrival_time=flight.arrival_time, 
                                                  num_stops=flight.num_stops, 
                                                  price_economy=flight.price_economy, 
                                                  price_business=flight.price_business,
                                                  baggage_allowance=flight.baggage_allowance, 
                                                  airline=flight.airline, 
                                                  departure_airport=flight.departure_airport, 
                                                  arrival_airport=flight.arrival_airport,
                                                  flight_time_minutes=flight.flight_time_minutes), 
                       returning_flight=None, 
                       return_date=None,
                       passengers=[])
        trip = TripEntity.from_dto(trip_dto)
        db.session.add(trip)

    db.session.commit()

    yield trip

    db.session.delete(trip)
    db.session.commit()

def test_create_trip(client):
    response = client.post('/api/trips', json={
        "guid": "trip456",
        "name": "New Trip",
        "is_round_trip": False,
        "passengers": [],
        "departure_date": "2024-11-20", 
        "departing_flight": {
            "guid": "test_flight123", 
            "flight_time_minutes": 224, 
            "departure_time": "10:30AM", 
            "arrival_time": "2:14PM",
            "num_stops": 1, 
            "price_economy": 700.0, 
            "price_business": 400.0, 
            "baggage_allowance": "1 checked bag", 
            "airline": {
                "guid": "test_airline123", 
                "icao_code": "ICAO123", 
                "name": "Test Airline", 
                "logo_path": None
            },
            "arrival_airport": {
                "guid": "12345",
                "full_name": "Test Airport Full Name",
                "short_name": "Test Airport",
                "municipality_name": "Test City",
                "iata_code": "TST",
                "location": {
                    "guid": "loc123",
                    "latitude": 37.7749,
                    "longitude": -122.4194
                },
                "country": {
                    "guid": "country123",
                    "code": "USA",
                    "name": "United States",
                    "continent": {
                        "guid": "cont123",
                        "code": "NA",
                        "name": "North America"
                    }
                }
            },
            "departure_airport": {
                "guid": "12345",
                "full_name": "Test Airport Full Name",
                "short_name": "Test Airport",
                "municipality_name": "Test City",
                "iata_code": "TST",
                "location": {
                    "guid": "loc123",
                    "latitude": 37.7749,
                    "longitude": -122.4194
                },
                "country": {
                    "guid": "country123",
                    "code": "USA",
                    "name": "United States",
                    "continent": {
                        "guid": "cont123",
                        "code": "NA",
                        "name": "North America"
                    }
                }  
            }
        },
        "returning_flight": None,
        "return_date": None,
    })

    assert response.status_code == 201
    data = response.get_json()
    assert data == {"message": "1 trip(s) created successfully"}

def test_get_all_trips(client, setup_trip):
    response = client.get('/api/trips')

    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert any(trip['guid'] == setup_trip.guid for trip in data)

def test_get_trip_by_guid(client, setup_trip):
    response = client.get(f'/api/trips/{setup_trip.guid}')

    assert response.status_code == 200
    data = response.get_json()
    assert data['guid'] == setup_trip.guid

def test_delete_trip(client, setup_trip):
    response = client.delete(f'/api/trips/{setup_trip.guid}')

    assert response.status_code == 200
    data = response.get_json()
    assert data == {"message": "Trip deleted successfully"}
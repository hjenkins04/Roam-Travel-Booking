import pytest
from app import create_app, db
from app.models.dto.airline_dto import AirlineDTO
from app.models.dto.airport_dto import AirportDTO
from app.models.dto.location_dto import LocationDTO
from app.models.dto.country_dto import CountryDTO
from app.models.dto.flight_dto import FlightDTO
from app.models.entities.flight_entity import FlightEntity
from app.models.entities.airline_entity import AirlineEntity
from app.models.entities.airport_entity import AirportEntity
from app.models.entities.country_entity import CountryEntity
from app.models.entities.location_entity import LocationEntity
from app.models.entities.continent_entity import ContinentEntity
import warnings
from sqlalchemy.exc import SAWarning



@pytest.fixture
def setup_continent_country():
    """Fixture to create necessary continent and country records for foreign key references."""
    continent = ContinentEntity.query.filter_by(guid="cont123").first()
    if not continent:
        continent = ContinentEntity(guid="cont123", code="NA", name="North America")
        db.session.add(continent)

    country = CountryEntity.query.filter_by(guid="country123").first()
    if not country:
        country = CountryEntity(guid="country123", code="USA", name="United States", continent=continent)
        db.session.add(country)

    db.session.commit()

    yield  

    # Clean up after each test if needed
    db.session.delete(country)
    db.session.delete(continent)
    db.session.commit()

@pytest.fixture
def setup_airport(client, setup_continent_country):
    """Fixture to create a test airport."""
    country = CountryEntity.query.filter_by(guid="country123").first()

    location = LocationEntity.query.filter_by(guid="loc123").first()
    if not location:
        location = LocationEntity(guid="loc123", latitude=37.7749, longitude=-122.4194)
        db.session.add(location)
        db.session.commit()

    airport = AirportEntity.query.filter_by(guid="12345").first()
    if not airport:
        airport_dto = AirportDTO(
            guid="12345",
            full_name="Test Airport Full Name",
            short_name="Test Airport",
            municipality_name="Test City",
            iata_code="TST",
            location=LocationDTO(guid=location.guid, latitude=location.latitude, longitude=location.longitude),
            country=CountryDTO(guid=country.guid, code=country.code, name=country.name, continent=None)
        )
        airport = AirportEntity.from_dto(airport_dto)
        db.session.add(airport)
        db.session.commit()

    yield airport  # Provide the airport for tests

    db.session.delete(airport)
    db.session.delete(location)
    db.session.commit()

@pytest.fixture
def setup_airline(client, setup_continent_country):
    """Fixture to create a test airline."""
    airline = AirlineEntity.query.filter_by(guid="airline123").first()
    if not airline:
        # Create a test airline
        airline_dto = AirlineDTO(
            guid="airline123",
            icao_code="ABC",
            name="Test Airline",
            logo_path="/path/to/logo.png"
        )
        airline = AirlineEntity.from_dto(airline_dto)  
        db.session.add(airline)
        db.session.commit()

    yield airline  # Provide the airline for tests

    # Clean up the airline after tests
    db.session.delete(airline)
    db.session.commit()

@pytest.fixture
def setup_flight(client, setup_airport, setup_airline):
    """Fixture to create a test flight."""
    # Use a unique GUID for each flight
    flight_guid = "flight123"  

    flight = FlightEntity.query.filter_by(guid=flight_guid).first()
    if not flight:
        # Manually create an AirportDTO instance from setup_airport
        airport_dto = AirportDTO(
            guid=setup_airport.guid,
            full_name=setup_airport.full_name,
            short_name=setup_airport.short_name,
            municipality_name=setup_airport.municipality_name,
            iata_code=setup_airport.iata_code,
            location=None,  # Set this as needed
            country=None    # Set this as needed
        )

        flight_dto = FlightDTO(
            guid=flight_guid,  
            departure_time="2024-11-01T08:00:00Z",
            arrival_time="2024-11-01T12:00:00Z",
            num_stops=0,
            price_economy=199.99,
            price_business=499.99,
            baggage_allowance="1 checked bag",
            airline=AirlineDTO.from_dict({
                "guid": setup_airline.guid,
                "icao_code": setup_airline.icao_code,
                "name": setup_airline.name,
                "logo_path": setup_airline.logo_path
            }),
            departure_airport=airport_dto,
            arrival_airport=airport_dto,
            flight_time_minutes=240,
            seat_configuration_id="seat123"
        )

        flight = FlightEntity.from_dto(flight_dto)
        db.session.add(flight)
        db.session.commit()

    yield flight  


    db.session.delete(flight)
    db.session.commit()

def test_create_flight(client, setup_airport):
    """Test flight creation via API."""
    response = client.post('/api/flights', json={
        "guid": "flight123_unique",  
        "departure_time": "2024-11-01T08:00:00Z",
        "arrival_time": "2024-11-01T12:00:00Z",
        "num_stops": 0,
        "price_economy": 199.99,
        "price_business": 499.99,
        "baggage_allowance": "1 checked bag",
        "airline": {
            "guid": "airline12",
            "icao_code": "AL123",
            "name": "Test Airline",
            "logo_path": "/path/to/logo"
        },
        "departure_airport": {
            "guid": "12345",
            "full_name": "Test Airport Full Name",
            "short_name": "Test Airport",
            "municipality_name": "Test City",
            "iata_code": "TST"
        },
        "arrival_airport": {
            "guid": "12345",
            "full_name": "Test Airport Full Name",
            "short_name": "Test Airport",

            "municipality_name": "Test City",
            "iata_code": "TST"
        },
        "flight_time_minutes": 240,
        "seat_configuration_id": "seat123"
    })

    assert response.status_code == 201, f"Unexpected status code: {response.status_code}, response data: {response.get_json()}"
    data = response.get_json()
    assert data == {"message": "1 flight(s) created successfully"}, f"Unexpected response data: {data}"


def test_get_flight_by_id(client, setup_flight):
    """Test getting a flight by its GUID."""
    response = client.get(f'/api/flights/{setup_flight.guid}')
    assert response.status_code == 200, f"Unexpected status code: {response.status_code}, response data: {response.get_json()}"
    data = response.get_json()
    assert data['guid'] == setup_flight.guid, "Flight GUID does not match"


def test_get_all_flights(client, setup_flight):
    """Test retrieving all flights."""
    response = client.get('/api/flights')
    assert response.status_code == 200, f"Unexpected status code: {response.status_code}, response data: {response.get_json()}"
    data = response.get_json()
    assert isinstance(data, list), "Response data should be a list"
    assert any(flight['guid'] == setup_flight.guid for flight in data), "Setup flight not found in the response"

def test_get_flights_by_destination_id(client, setup_flight):
    """Test getting flights by destination ID."""
    destination_id = "12345" 
    response = client.get(f'/api/flights/destination/{destination_id}')
    assert response.status_code == 200, f"Unexpected status code: {response.status_code}, response data: {response.get_json()}"
    data = response.get_json()
    assert isinstance(data, list), "Response data should be a list"

def test_get_flights_by_departure_id(client, setup_flight):
    """Test getting flights by departure ID."""
    departure_id = "12345" 
    response = client.get(f'/api/flights/departure/{departure_id}')
    assert response.status_code == 200, f"Unexpected status code: {response.status_code}, response data: {response.get_json()}"
    data = response.get_json()
    assert isinstance(data, list), "Response data should be a list"

def test_get_flights_by_airline_id(client, setup_airline):
    """Test getting flights by airline ID."""
    response = client.get(f'/api/flights/airline/{setup_airline.guid}')
    assert response.status_code == 200, f"Unexpected status code: {response.status_code}, response data: {response.get_json()}"
    data = response.get_json()
    assert isinstance(data, list), "Response data should be a list"

def test_get_flights_by_search_query(client):
    """Test searching for flights."""
    search_data = {
        "departure": "New York",
        "arrival": "Los Angeles",
        "date": "2024-11-01",
        "passengers": 1
    }
    response = client.post('/api/flights/search', json=search_data)
    assert response.status_code == 200, f"Unexpected status code: {response.status_code}, response data: {response.get_json()}"
    data = response.get_json()
    assert isinstance(data, list), "Response data should be a list"

def test_delete_flight(client, setup_flight):
    """Test deleting a flight by its GUID."""
    response = client.delete(f'/api/flights/{setup_flight.guid}')
    assert response.status_code == 200, f"Unexpected status code: {response.status_code}, response data: {response.get_json()}"
    data = response.get_json()
    assert data['message'] == "Flight deleted successfully", "Unexpected response message"

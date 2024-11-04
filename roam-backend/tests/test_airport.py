import pytest
from app import create_app, db
from app.models.dto.airport_dto import AirportDTO
from app.models.entities.airport_entity import AirportEntity
from app.models.entities.country_entity import CountryEntity
from app.models.dto.location_dto import LocationDTO
from app.models.dto.country_dto import CountryDTO
from app.models.entities.country_entity import CountryEntity
from app.models.entities.location_entity import LocationEntity
from app.models.entities.continent_entity import ContinentEntity
from flask import Flask
import sys

SQLALCHEMY_SILENCE_UBER_WARNING=1.

@pytest.fixture
def setup_continent_country():
    """Fixture to create necessary continent and country records for foreign key references."""
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

    db.session.commit()

    yield  # This allows the test to run with the setup in place

    # Clean up after each test if needed
    db.session.delete(country)
    db.session.delete(continent)
    db.session.commit()

@pytest.fixture
def setup_airport(client, setup_continent_country):
    """Fixture to create a test airport."""
    country = CountryEntity.query.filter_by(guid="country123").first()

    # Check if location exists, create if not
    location = LocationEntity.query.filter_by(guid="loc123").first()
    if not location:
        location = LocationEntity(guid="loc123", latitude=37.7749, longitude=-122.4194)
        db.session.add(location)
        db.session.commit()  # Commit to ensure location is in the DB

    # Check if airport already exists
    airport = AirportEntity.query.filter_by(guid="12345").first()
    if not airport:
        # Create a test airport using from_dto method
        airport_dto = AirportDTO(
            guid="12345",
            full_name="Test Airport Full Name",
            short_name="Test Airport",
            municipality_name="Test City",
            iata_code="TST",
            location=LocationDTO(guid=location.guid, latitude=location.latitude, longitude=location.longitude),
            country=CountryDTO(guid=country.guid, code=country.code, name=country.name, continent=None)  # Adjust as needed
        )
        airport = AirportEntity.from_dto(airport_dto)
        db.session.add(airport)
        db.session.commit()

    yield airport  # Provide the airport for tests

    # Clean up the airport and location after tests
    db.session.delete(airport)
    db.session.delete(location)  # Also delete the location to avoid dangling references
    db.session.commit()


# Adjust the tests to remove redundant data creation
def test_create_airport(client, setup_continent_country):
    # No need to setup airport again as it's already created in setup_airport
    response = client.post('/api/airports', json={
        "guid": "123",
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
            "name": "United States"
        }
    })

    assert response.status_code == 201, f"Unexpected status code: {response.status_code}, response data: {response.get_json()}"
    data = response.get_json()
    assert data == {"message": "1 airport(s) created successfully"}, f"Unexpected response data: {data}"


def test_get_all_airports(client, setup_airport):
    """Test retrieving all airports."""
    response = client.get('/api/airports')

    assert response.status_code == 200, f"Unexpected status code: {response.status_code}"
    data = response.get_json()
    assert isinstance(data, list), "Response should be a list of airports"
    assert any(airport['guid'] == setup_airport.guid for airport in data), "Test airport should be in the list"

def test_get_airport_by_guid(client, setup_airport):
    """Test retrieving a specific airport by GUID."""
    response = client.get(f'/api/airports/{setup_airport.guid}')

    assert response.status_code == 200, f"Unexpected status code: {response.status_code}"
    data = response.get_json()
    assert data['guid'] == setup_airport.guid, "Returned airport GUID should match the setup airport"


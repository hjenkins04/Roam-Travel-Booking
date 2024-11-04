import pytest
from app import create_app, db
from app.models.dto.airline_dto import AirlineDTO
from app.models.entities.airline_entity import AirlineEntity

@pytest.fixture
def setup_airline(client):
    """Fixture to create a test airline."""
    airline_dto = AirlineDTO(guid="airline123", icao_code="ICAO123", name="Test Airline")
    airline_entity = AirlineEntity.from_dto(airline_dto)
    db.session.add(airline_entity)
    db.session.commit()

    yield airline_entity

    db.session.delete(airline_entity)
    db.session.commit()

def test_create_airline(client):
    response = client.post('/api/airlines', json={
        "guid": "airline456",
        "icao_code": "ICAO456",
        "name": "New Airline"
    })

    assert response.status_code == 201
    data = response.get_json()
    assert data == {"message": "1 airport(s) created successfully"}

def test_get_all_airlines(client, setup_airline):
    response = client.get('/api/airlines')

    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert any(airline['guid'] == setup_airline.guid for airline in data)

def test_get_airline_by_guid(client, setup_airline):
    response = client.get(f'/api/airlines/{setup_airline.guid}')

    assert response.status_code == 200
    data = response.get_json()
    assert data['guid'] == setup_airline.guid

def test_delete_airline(client, setup_airline):
    response = client.delete(f'/api/airlines/{setup_airline.guid}')

    assert response.status_code == 200
    data = response.get_json()
    assert data == {"message": "Airline deleted successfully"}

def test_get_airline_not_found(client):
    response = client.get('/api/airlines/nonexistent_guid')

    assert response.status_code == 404
    data = response.get_json()
    assert data == {"error": "Airline not found"}
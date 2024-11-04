import pytest
from app import create_app, db
from app.models.dto.trip_dto import TripDTO
from app.models.entities.trip_entity import TripEntity

@pytest.fixture
def setup_trip(client):
    """Fixture to create a test trip."""
    trip_dto = TripDTO(guid="trip123", name="Test Trip", is_round_trip=True)
    trip_entity = TripEntity.from_dto(trip_dto)
    db.session.add(trip_entity)
    db.session.commit()

    yield trip_entity

    db.session.delete(trip_entity)
    db.session.commit()

def test_create_trip(client):
    response = client.post('/api/trips', json={
        "guid": "trip456",
        "name": "New Trip",
        "is_round_trip": False
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

def test_get_trip_not_found(client):
    response = client.get('/api/trips/nonexistent_guid')

    assert response.status_code == 404
    data = response.get_json()
    assert data == {"error": "Trip not found"}
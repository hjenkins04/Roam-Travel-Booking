import pytest
from app import create_app, db
from app.models.dto.pop_destination_dto import PopularDestinationDTO
from app.models.entities.pop_destination_entity import PopularDestinationEntity

@pytest.fixture
def setup_destination(client):
    """Fixture to create a test popular destination."""
    destination_dto = PopularDestinationDTO(guid="dest123", name="Test Destination")
    destination_entity = PopularDestinationEntity.from_dto(destination_dto)
    db.session.add(destination_entity)
    db.session.commit()

    yield destination_entity

    db.session.delete(destination_entity)
    db.session.commit()

def test_create_destination(client):
    response = client.post('/api/destination', json={
        "guid": "dest456",
        "name": "New Destination"
    })

    assert response.status_code == 201
    data = response.get_json()
    assert data == {"message": "1 destination(s) created successfully"}

def test_get_all_destinations(client, setup_destination):
    response = client.get('/api/destination/all')

    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert any(destination['guid'] == setup_destination.guid for destination in data)

def test_get_destination_by_guid(client, setup_destination):
    response = client.get(f'/api/destination/{setup_destination.guid}')

    assert response.status_code == 200
    data = response.get_json()
    assert data['guid'] == setup_destination.guid

def test_get_destination_not_found(client):
    response = client.get('/api/destination/nonexistent_guid')

    assert response.status_code == 404
    data = response.get_json()
    assert data == {"error": "Destination not found"}
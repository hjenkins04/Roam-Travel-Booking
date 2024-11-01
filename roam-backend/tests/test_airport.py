import pytest
from app import create_app
from app.models.dto.airport_dto import AirportDTO
from flask import Flask
import sys

SQLALCHEMY_SILENCE_UBER_WARNING=1.

def test_create_airport(client):
    response = client.post('/api/airports', json={
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
            "name": "United States"
        },
        "continent": {
            "guid": "cont123",
            "code": "NA",
            "name": "North America"
        }
    })
    assert response.status_code == 201
    assert b"created successfully" in response.data
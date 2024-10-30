from typing import List, Optional
from app.services.flight_service import FlightService
from app.models.dto.flight_dto import FlightDTO
from app.models.dto.flight_search_dto import FlightSearchDTO
from flask import Blueprint, request, jsonify, Response

flight_bp = Blueprint('flight', __name__)

@flight_bp.route('/api/flights', methods=['POST'])
def create_flight() -> Response:
    data = request.json
    try:
        flight_dto = FlightDTO(
            guid=data.get('guid'),
            airline=data.get('airline'),
            departure_airport=data.get('departure_airport'),
            arrival_airport=data.get('arrival_airport'),
            flight_time_minutes=data.get('flight_time_minutes'),
            seat_configuration_id=data.get('seat_configuration_id'),
            layover=data.get('layover')
        )
        FlightService.create_flight(flight_dto)
        return jsonify({"message": "Flight created successfully"}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@flight_bp.route('/api/flights', methods=['GET'])
def get_all_flights() -> Response:
    flights = FlightService.get_all_flights()
    flight_list = [flight.to_dto().to_dict() for flight in flights]
    return jsonify(flight_list), 200

@flight_bp.route('/api/flights/<string:guid>', methods=['GET'])
def get_flight_by_id(guid: str) -> Response:
    try:
        flight = FlightService.get_flight_by_id(guid)
        return jsonify(flight.to_dto().to_dict()), 200
    except ValueError:
        return jsonify({"error": "Flight not found"}), 404
    except Exception:
        return jsonify({"error": "Internal Server Error"}), 500

@flight_bp.route('/api/flights/destination/<string:destination_id>', methods=['GET'])
def get_flights_by_destination_id(destination_id: str) -> Response:
    flights = FlightService.get_flights_by_destination_id(destination_id)
    flight_list = [flight.to_dto().to_dict() for flight in flights]
    return jsonify(flight_list), 200

@flight_bp.route('/api/flights/departure/<string:departure_id>', methods=['GET'])
def get_flights_by_departure_id(departure_id: str) -> Response:
    flights = FlightService.get_flights_by_departure_id(departure_id)
    flight_list = [flight.to_dto().to_dict() for flight in flights]
    return jsonify(flight_list), 200

@flight_bp.route('/api/flights/airline/<string:airline_id>', methods=['GET'])
def get_flights_by_airline_id(airline_id: str) -> Response:
    flights = FlightService.get_flights_by_airline_id(airline_id)
    flight_list = [flight.to_dto().to_dict() for flight in flights]
    return jsonify(flight_list), 200

@flight_bp.route('/api/flights/search', methods=['GET'])
def get_flights_by_destination_id() -> Response:
    data = request.json
    flight_search_dto = FlightSearchDTO(
        departure_airport_id=data.get('departure_airport_id'),
        arival_airport_id=data.get('arival_airport_id')
    )
    flights = FlightService.get_flights_by_search_query(flight_search_dto)
    flight_list = [flight.to_dto().to_dict() for flight in flights]
    return jsonify(flight_list), 200

@flight_bp.route('/api/flights/<string:guid>', methods=['DELETE'])
def delete_flight(guid: str) -> Response:
    try:
        FlightService.delete_flight(guid)
        return jsonify({"message": "Flight deleted successfully"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception:
        return jsonify({"error": "Internal Server Error"}), 500
    
    
@flight_bp.route('/api/flight/<string:guid>/seats', methods=['GET'])
def get_flight_seats_by_flight_id(guid: str) -> Response:
    try:
        seat_configuration = FlightService.get_flight_seats_by_flight_id(guid)
        return jsonify(seat_configuration.to_dto().to_dict()), 200
    except ValueError:
        return jsonify({"error": "Flight Seats not found"}), 404
    except Exception:
        return jsonify({"error": "Internal Server Error"}), 500
    
    
@flight_bp.route('/api/flight/seats/<string:guid>', methods=['GET'])
def get_flight_seats_by_id(guid: str) -> Response:
    try:
        seat_configuration = FlightService.get_flight_seats_by_id(guid)
        return jsonify(seat_configuration.to_dto().to_dict()), 200
    except ValueError:
        return jsonify({"error": "Flight Seats not found"}), 404
    except Exception:
        return jsonify({"error": "Internal Server Error"}), 500

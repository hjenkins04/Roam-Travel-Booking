from typing import List, Optional
from app.services.airline_service import AirlineService
from app.models.dto.airline_dto import AirlineDTO
from flask import Blueprint, request, jsonify, Response

airline_bp = Blueprint('airline', __name__)

@airline_bp.route('/api/airlines', methods=['POST'])
def create_airline() -> Response:
    data = request.json
    
    # Check if data is a list of dict or a single dict
    airlines_data = data if isinstance(data, list) else [data]
    
    try:
        airline_dtos = [AirlineDTO.from_dict(airline_data) for airline_data in airlines_data]
        
        for dto in airline_dtos:
            AirlineService.create_airline(dto)
        
        return jsonify({"message": f"{len(airline_dtos)} airline(s) created successfully"}), 201
    
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@airline_bp.route('/api/airlines', methods=['GET'])
def get_all_airlines() -> Response:
    airlines = AirlineService.get_all_airlines()
    airline_list = [airline.to_dto().to_dict() for airline in airlines]
    return jsonify(airline_list), 200

@airline_bp.route('/api/airlines/<string:guid>', methods=['GET'])
def get_airport_by_id(guid: str) -> Response:
    try:
        airport = AirlineService.get_airline_by_id(guid)
        return jsonify(airport.to_dto().to_dict()), 200
    except ValueError:
        return jsonify({"error": "Airline not found"}), 404
    except Exception:
        return jsonify({"error": "Internal Server Error"}), 500

@airline_bp.route('/api/airlines/icao/<string:iaco_code>', methods=['GET'])
def get_airport_by_icao_code(icao_code: str) -> Response:
    airline = AirlineService.get_airport_by_icao_code(icao_code)
    if airline:
        return jsonify(airline.to_dto().to_dict()), 200
    else:
        return jsonify({"error": "Airline not found"}), 404


@airline_bp.route('/api/airlines/<string:guid>', methods=['DELETE'])
def delete_airport(guid: str) -> Response:
    try:
        AirlineService.delete_airline(guid)
        return jsonify({"message": "Airline deleted successfully"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception:
        return jsonify({"error": "Internal Server Error"}), 500

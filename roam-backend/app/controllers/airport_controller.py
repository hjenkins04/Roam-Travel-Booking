from typing import List, Optional
from app.services.airport_service import AirportService
from app.models.dto.airport_dto import AirportDTO
from flask import Blueprint, request, jsonify, Response

airport_bp = Blueprint('airport', __name__)

@airport_bp.route('/api/airports', methods=['POST'])
def create_airport() -> Response:
    data = request.json
    
    # Check if data is a list of dict or a single dict
    airports_data = data if isinstance(data, list) else [data]
    
    try:
        airport_dtos = [AirportDTO.from_dict(airport_data) for airport_data in airports_data]
        
        for dto in airport_dtos:
            AirportService.create_airport(dto)
        
        return jsonify({"message": f"{len(airport_dtos)} airport(s) created successfully"}), 201
    
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@airport_bp.route('/api/airports', methods=['GET'])
def get_all_airports() -> Response:
    airports = AirportService.get_all_airports()
    airport_list = [airport.to_dto().to_dict() for airport in airports]
    return jsonify(airport_list), 200

@airport_bp.route('/api/airports/<string:guid>', methods=['GET'])
def get_airport_by_id(guid: str) -> Response:
    try:
        airport = AirportService.get_airport_by_id(guid)
        return jsonify(airport.to_dto().to_dict()), 200
    except ValueError:
        return jsonify({"error": "Airport not found"}), 404
    except Exception:
        return jsonify({"error": "Internal Server Error"}), 500

@airport_bp.route('/api/airports/iata/<string:iata_code>', methods=['GET'])
def get_airport_by_iata_code(iata_code: str) -> Response:
    airport = AirportService.get_airport_by_iata_code(iata_code)
    if airport:
        return jsonify(airport.to_dto().to_dict()), 200
    else:
        return jsonify({"error": "Airport not found"}), 404

@airport_bp.route('/api/airports/country/<string:country_code>', methods=['GET'])
def get_all_airports_by_country_code(country_code: str) -> Response:
    airports = AirportService.get_all_airports_by_country_code(country_code)
    airport_list = [airport.to_dto().to_dict() for airport in airports]
    return jsonify(airport_list), 200

@airport_bp.route('/api/airports/<string:guid>', methods=['DELETE'])
def delete_airport(guid: str) -> Response:
    try:
        AirportService.delete_airport(guid)
        return jsonify({"message": "Airport deleted successfully"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception:
        return jsonify({"error": "Internal Server Error"}), 500

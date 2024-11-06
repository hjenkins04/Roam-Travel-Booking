from typing import List
from app.services.pop_destination_service import PopularDestinationService
from app.models.dto.pop_destination_dto import PopularDestinationDTO
from flask import Blueprint, request, jsonify, Response

destination_bp = Blueprint("popular_destinations", __name__)

@destination_bp.route("/api/destination", methods=["POST"])
def create_destination() -> Response:
    data = request.json
    
    # Check if data is a list of dicts or a single dict
    destinations_data = data if isinstance(data, list) else [data]
    
    try:
        destination_dtos = [PopularDestinationDTO.from_dict(destination_data) for destination_data in destinations_data ]
        
        for destination_dto in destination_dtos:
            PopularDestinationService.add_destination(destination_dto)
        
        return jsonify({"message": f"{len(destination_dtos)} destination(s) created successfully"}), 201
    
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    
@destination_bp.route('/api/destination/all', methods=['GET'])
def get_all_destinations() -> Response:
    destinations = PopularDestinationService.get_all_destinations()
    destination_list = [destination.to_dto().to_dict() for destination in destinations]
    return jsonify(destination_list), 200

@destination_bp.route('/api/destination/popular', methods=['GET'])
def get_popular_destinations() -> Response:
    destinations = PopularDestinationService.get_random_popular_destinations()
    destination_list = [destination.to_dto().to_dict() for destination in destinations]
    return jsonify(destination_list), 200

@destination_bp.route('/api/destination/<string:guid>', methods=['GET'])
def get_destination_by_id(guid: str) -> Response:
    try:
        destination = PopularDestinationService.get_destination_by_guid(guid)
        return jsonify(destination.to_dto().to_dict()), 200
    except ValueError:
        return jsonify({"error": "Destination not found"}), 404
    except Exception:
        return jsonify({"error": "Internal Server Error"}), 500


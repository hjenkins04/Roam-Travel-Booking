from typing import List
from app.services.trip_service import TripService
from app.models.dto.trip_dto import TripDTO
from flask import Blueprint, request, jsonify, Response

trip_bp = Blueprint("trip", __name__)

@trip_bp.route("/api/trips", methods=["POST"])
def create_trip() -> Response:
    data = request.json
    
    # Check if data is a list of dicts or a single dict
    trips_data = data if isinstance(data, list) else [data]
    
    try:
        trip_dtos = [TripDTO.from_dict(trip_data) for trip_data in trips_data]
        
        for trip_dto in trip_dtos:
            TripService.create_trip(trip_dto)
        
        return jsonify({"message": f"{len(trip_dtos)} trip(s) created successfully"}), 201
    
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@trip_bp.route("/api/trips", methods=["GET"])
def get_all_trips() -> Response:
    trips = TripService.get_all_trips()
    trip_list = [trip.to_dto().to_dict() for trip in trips]
    return jsonify(trip_list), 200

@trip_bp.route("/api/trips/<string:guid>", methods=["GET"])
def get_trip_by_id(guid: str) -> Response:
    try:
        trip = TripService.get_trip_by_id(guid)
        return jsonify(trip.to_dto().to_dict()), 200
    except ValueError:
        return jsonify({"error": "Trip not found"}), 404
    except Exception:
        return jsonify({"error": "Internal Server Error"}), 500

@trip_bp.route("/api/trips/round_trip/<string:is_round_trip>", methods=["GET"])
def get_round_trips(is_round_trip: str) -> Response:
    # Convert true/false to boolean
    is_round_trip_bool = is_round_trip.lower() == 'true'
    trips = TripService.get_round_trips(is_round_trip_bool)
    trip_list = [trip.to_dto().to_dict() for trip in trips]
    return jsonify(trip_list), 200

@trip_bp.route("/api/trips/departing_flight/<string:flight_guid>", methods=["GET"])
def get_trips_by_departing_flight(flight_guid: str) -> Response:
    trips = TripService.get_trips_by_departing_flight(flight_guid)
    trip_list = [trip.to_dto().to_dict() for trip in trips]
    return jsonify(trip_list), 200

@trip_bp.route("/api/trips/returning_flight/<string:flight_guid>", methods=["GET"])
def get_trips_by_returning_flight(flight_guid: str) -> Response:
    trips = TripService.get_trips_by_returning_flight(flight_guid)
    trip_list = [trip.to_dto().to_dict() for trip in trips]
    return jsonify(trip_list), 200


@trip_bp.route("/api/trips/<string:guid>", methods=["DELETE"])
def delete_trip(guid: str) -> Response:
    try:
        TripService.delete_trip(guid)
        return jsonify({"message": "Trip deleted successfully"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception:
        return jsonify({"error": "Internal Server Error"}), 500
    

@trip_bp.route("/api/passengers", methods=["GET"])
def get_all_passengers() -> Response:
    passengers = TripService.get_all_passengers()
    passenger_list = [passenger.to_dto().to_dict() for passenger in passengers]
    return jsonify(passenger_list), 200

@trip_bp.route("/api/passengers/trip/<string:trip_id>", methods=["GET"])
def get_passengers_by_trip_id(trip_id: str) -> Response:
    passengers = TripService.get_passengers_by_trip_id(trip_id)
    passenger_list = [passenger.to_dto().to_dict() for passenger in passengers]
    return jsonify(passenger_list), 200

@trip_bp.route("/api/passengers/flight/<string:flight_id>", methods=["GET"])
def get_passengers_by_flight_id(flight_id: str) -> Response:
    passengers = TripService.get_passengers_by_flight_id(flight_id)
    passenger_list = [passenger.to_dto().to_dict() for passenger in passengers]
    return jsonify(passenger_list), 200


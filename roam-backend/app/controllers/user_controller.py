from typing import List, Dict, Optional
import uuid
from app.services.user_service import UserService
from flask import Blueprint, request, jsonify, Response
from middleware import token_required

user_bp = Blueprint('user', __name__)

@user_bp.route('/api/users', methods=['POST'])
def add_user() -> Response:
    data = request.json
    try:
        UserService.create_user(
            email=data.get('email'),
            phone=data.get('phone'),
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            password=data.get('password')
        )
        return jsonify({"message": "User created successfully"}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@user_bp.route('/api/users', methods=['GET'])
def get_users() -> Response:
    users = UserService.get_all_users()
    user_list = [user.to_dict() for user in users]
    return jsonify(user_list), 200


@user_bp.route('/api/users/<uuid:user_id>', methods=['GET'])
def get_user_by_id(user_id: uuid) -> Response:
    try:
        user = UserService.get_user_by_id(user_id)
        return jsonify(user.to_dict()), 200
    except ValueError:
        return jsonify({"error": "User not found"}), 404
    except:
        return jsonify({"error": "Internal Server Error"}), 500

@user_bp.route('/api/users/<uuid:user_id>', methods=['DELETE'])
def delete_user(user_id: uuid.UUID) -> Response:
    try:
        UserService.delete_user(user_id)
        return jsonify({"message": "User deleted successfully"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception:
        return jsonify({"error": "Internal Server Error"}), 500
    
@user_bp.route('/api/users/check-email', methods=['GET'])
def check_email_exists() -> Response:
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email parameter is required"}), 400
    exists = UserService.email_exists(email)
    return jsonify({"exists": exists}), 200



@user_bp.route('/api/users/protected', methods=['GET'])
@token_required
def protected_endpoint():
    return ("success"), 200
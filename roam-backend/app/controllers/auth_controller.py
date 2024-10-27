from flask import Blueprint, request, jsonify, Response
from app.services.user_service import UserService

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/auth/login', methods=['POST'])
def login() -> Response:
    data = request.json
    email = data.get('email')
    password = data.get('password')

    try:
        # Authenticate user and generate a jwt
        token = UserService.login(email, password)
        return jsonify({"token": token}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 401  # Unauthorized
    except Exception as e:
        return jsonify({"error": "Internal Server Error"}), 500

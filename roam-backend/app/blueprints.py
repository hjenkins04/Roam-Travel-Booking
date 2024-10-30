from flask import Flask

from app.controllers.user_controller import user_bp
from app.controllers.auth_controller import auth_bp
from app.controllers.airport_controller import airport_bp
from app.controllers.flight_controller import flight_bp
from app.controllers.trip_controller import trip_bp

def register_blueprints(app: Flask) -> None:
    """Registers all blueprints to the app."""
    
    app.register_blueprint(user_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(airport_bp)
    app.register_blueprint(flight_bp)
    app.register_blueprint(trip_bp)

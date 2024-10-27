from flask import Flask

from app.controllers.user_controller import user_bp
from app.controllers.auth_controller import auth_bp

def register_blueprints(app: Flask) -> None:
    """Registers all blueprints to the app."""
    
    app.register_blueprint(user_bp)
    app.register_blueprint(auth_bp)

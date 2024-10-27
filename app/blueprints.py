from flask import Flask

from app.controllers.user_controller import user_bp

def register_blueprints(app: Flask) -> None:
    """Registers all blueprints to the app."""
    
    app.register_blueprint(user_bp)

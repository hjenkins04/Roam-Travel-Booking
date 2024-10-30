from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    app.config['SECRET_KEY'] = "843cc893a5ce8ae33d2d55b121732d26fdd9fce875c25f09d9aeff62eef71959571b0068b6ce06b3ea6b76db86a3c6ef41bae4563008d1a63220e8885daa5db0"

    CORS(app, origins=["http://localhost:3000","http://localhost:3001" ])
    
    # Initialize db with app
    db.init_app(app)

    # Import and register blueprints
    from .blueprints import register_blueprints
    register_blueprints(app)

    return app

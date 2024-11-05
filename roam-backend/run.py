# This is the main entry point for running the Flask web application.
# 
# This script initializes and starts the Flask application by creating
# an application instance (`app`) and setting up the necessary database tables
# within the application context.
#
# Input and Output:
# - Environment variables are used for configuring the host and port 
#   (FLASK_RUN_HOST and FLASK_RUN_PORT).
# - The script starts the Flask application server and listens for HTTP requests 
#   on the specified host and port.
#

from app import create_app, db
import os

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
    host = os.getenv("FLASK_RUN_HOST", "127.0.0.1")
    port = int(os.getenv("FLASK_RUN_PORT", 5000))
    
    app.run(host=host, port=port, debug=True)

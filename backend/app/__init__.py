import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

def create_app():
    load_dotenv()
    app = Flask(__name__)

    allowed = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")
    origins = [o.strip() for o in allowed.split(",") if o.strip()]
    CORS(app, resources={r"/api/*": {"origins": origins}})

    from .routes import api
    app.register_blueprint(api, url_prefix="/api")
    return app

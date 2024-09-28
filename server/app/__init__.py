# app/__init__.py

from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from app.routes.users import register_user_routes
from app.routes.behavioral import register_behavioral_routes
from app.routes.battle import register_battle_routes
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()
def create_app():
    app = Flask(__name__)
    CORS(app)
    # Configure MongoDB connection
    uri = os.getenv("MONGODB_URI")
    app.config["MONGO_URI"] = uri
    client = MongoClient(uri)

    register_user_routes(app, client)
    register_behavioral_routes(app, client)
    register_battle_routes(app, client)

    return app

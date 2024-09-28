# app/__init__.py

from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from app.routes.users import register_routes

# Load environment variables from .env file
load_dotenv()

def create_app():
    app = Flask(__name__)

    # Configure MongoDB connection
    uri = os.getenv("MONGODB_URI")
    app.config["MONGO_URI"] = uri
    client = MongoClient(uri)

    register_routes(app, client)

    return app

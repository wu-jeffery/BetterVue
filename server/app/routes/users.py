import flask
import bson
import hashlib
import uuid
import jwt
from dotenv import load_dotenv
import os
from bson import ObjectId

def register_user_routes(app, client):
    load_dotenv()
    SECRET_KEY = os.getenv("SECRET_KEY")
    users = client.interview_prep.users  

    @app.route("/users/info/" , methods=["POST"])
    def info():
        data = flask.request.get_json()
        username = data.get("username")

        user = users.find_one({"username": username})
        if not user:
            return flask.abort(404)

        return flask.jsonify(user), 200

    @app.route("/users/verify/" , methods=["POST"])
    def verify():
        data = flask.request.get_json()
        token = data.get("token")

        try:
            decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            username = decoded["username"]
        except:
            return flask.abort(401)

        user = users.find_one({"username": username})
        if not user:
            return flask.abort(401)

        return flask.jsonify({"username": username}), 200

    @app.route("/users/login/", methods=["POST"])
    def login():
        data = flask.request.get_json()
        email = data.get("email")
        username = data.get("username")
        password = data.get("password")

        user = users.find_one({"email": email})
        if not user:
            user = users.find_one({"username": username})
            if not user:
                return flask.abort(404)

        hashed_password = user["password"]
            
        algorithm, salt, hash_value = hashed_password.split('$')
        sha512 = hashlib.new(algorithm)
        salted_pass = salt + password
        sha512.update(salted_pass.encode('utf-8'))
        if (hash_value == sha512.hexdigest()):
            token = jwt.encode({"username": username}, SECRET_KEY, algorithm="HS256")
            return flask.jsonify({"token": token}), 200
        else:
            return flask.abort(403)

    @app.route("/users/create_account/", methods=["POST"])
    def create_account():
        data = flask.request.get_json()
        email = data.get("email")
        username = data.get("username")
        password = data.get("password")
        
        algorithm = 'sha512'
        salt = uuid.uuid4().hex
        hash_obj = hashlib.new(algorithm)
        password_salted = salt + password
        hash_obj.update(password_salted.encode('utf-8'))
        password_hash = hash_obj.hexdigest()
        hashed_password = "$".join([algorithm, salt, password_hash])

        temp = users.find_one({"email": email})
        if temp:
            return flask.abort(409)

        temp = users.find_one({"username": username})
        if temp:
            return flask.abort(409)

        user = {
            "email": email,
            "username": username,
            "password": hashed_password,
            "ELO": 1000,
            "questions_done": 0,
            "_id": ObjectId()
        }

        users.insert_one(user)

        token = jwt.encode({"username": username}, SECRET_KEY, algorithm="HS256")
        return flask.jsonify({"token": token}), 200


    @app.route("/users/delete_account/")
    def delete_account():
        username = flask.request.form["username"]

        user = users.find_one({"username": username})
        if not user:
            return flask.abort(404)

        users.delete_one({"username": username})
        return 200
import flask
import bson

def register_routes(app, client):
    users = client.interview_prep.users
    @app.route("/users/login/")
    def login():
        return "Hello, world!"

    @app.route("/users/create_account/", methods=["POST"])
    def create_account():
        email = flask.request.form["email"]
        username = flask.request.form["username"]
        password = flask.request.form["password"]

        user = {
            "email": email,
            "username": username,
            "password": password
        }

        users.insert_one(user)
        return "Account created!"


    @app.route("/users/delete_account/")
    def delete_account():
        return "Hello, world!"
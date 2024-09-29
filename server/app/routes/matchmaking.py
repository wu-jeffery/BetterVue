from flask_socketio import SocketIO, emit
from bson import ObjectId
import os
import flask

queue = []
sessions = {}

def register_matchmaking(app, socketio):
    @app.route("/matchmaking/opponent/", methods=["POST"])
    def get_opponent():
        data = flask.request.get_json()
        username = data["username"]
        session_id = data["session_id"]

        players = sessions[session_id]
        opponent = players[0] if players[1] == username else players[1]
        return flask.jsonify({"opponent": opponent}), 200

    @socketio.on("join")
    def on_join(data):
        global queue
        queue.append(data["username"])
        print(queue)
        if (len(queue) >= 2):
            players = queue[:2]
            queue = queue[2:]
            session_id = str(ObjectId())
            sessions[session_id] = players
            #question_id = os.urandom(1)[0] % 2
            question_id = 1
            socketio.emit("match_found", {"session_id": session_id, "question_id": question_id, "players": players})

    @socketio.on("battle_end")
    def end_battle(data):
        players = sessions[data["session_id"]]
        socketio.emit("post_match", {"players": players})


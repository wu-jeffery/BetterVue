import flask
from dotenv import load_dotenv
import os
from bson import ObjectId

def register_battle_routes(app, client):
    battle = client.interview_prep.battle

    @app.route("/battle/execute/", methods=["POST"])
    def battle():
        data = flask.request.get_json()
        source_code = data.get("source_code")
        test_cases = data.get("test_cases")

    @app.route("/battle/setup/")
    def setup():
        q1 = {
            "question": "Given a string s and an integer k, return the length of the longest substring of s that contains at most k distinct characters.",
            "test_cases": [
                {
                    "input": 's = "eceba", k = 2',
                    "output": "2"
                },
                {
                    "input": 's = "aabbcc", k = 2',
                    "output": "4"
                },
                {
                    "input": 's = "abcd", k = 5',
                    "output": "0"
                },
                {
                    "input": 's = "abcdefghijklmnopqrstuvwxyz", k = 26',
                    "output": "26"
                },
                {
                    "input": 's = "aaabbaabbbaabbaabbccaababbbaacc", k = 18',
                    "output": "2"
                }
            ],
            "_id": ObjectId()
        }

        battle.insert_one(q1)
        return "done"


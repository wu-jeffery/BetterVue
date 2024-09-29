import flask
from dotenv import load_dotenv
import os
from bson import ObjectId
import uuid

def register_battle_routes(app, client):
    db = client.interview_prep.battle

    @app.route("/battle/execute/", methods=["POST"])
    def execute_battle():
        data = flask.request.get_json()
        source_code = data.get("source_code")

        question = db.find_one({"_id": ObjectId(data.get("question_id"))})
        test_cases = question["test_cases"]
        function_name = question["function_name"]

        with open("temp.py", "w") as f:
            f.write(source_code)

            f.write('\n')
            f.write('passed = 0\n')
            f.write('total = 0\n')

            for t in test_cases:
                f.write('\n')
                f.write(f'if {function_name}{t["input"]} == {t["output"]}:\n')
                f.write('\tpassed += 1\n')
                f.write('total += 1\n')

            f.write("\n")
            f.write("if passed == total:\n")
            f.write("\tprint('All test cases passed!')\n")
            f.write("else:\n")
            f.write("\tprint(passed, '/', total, 'test cases passed')\n")

        os.system("python temp.py > output.txt 2> error.txt")

        with open("output.txt", "r") as f:
            score = f.read()
        
        with open("error.txt", "r") as f:
            error = f.read()

        if not score and not error:
            error = "Unknown error"

        return flask.jsonify({
            "score": score,
            "error": error
        }), 200

    @app.route("/battle/questions/", methods=["POST"])
    def get_battle_question():
        data = flask.request.get_json()
        index = int(data.get("index"))
        random_question = question = db.find().skip(index).limit(1).next()
        return flask.jsonify({
            "question": random_question["question"],
            "function_signature": random_question["function_signature"],
            "id": str(random_question["_id"])
        }), 200

    #this is not meant to be called
    def setup():
        q1 = {
            "question": "Given a string s and an integer k, return the length of the longest substring of s that contains at most k distinct characters.",
            "function_signature": "def longest_k_distinct(s: str, k: int) -> int:",
            "function_name": "longest_k_distinct",
            "test_cases": [
                {
                    "input": '("eceba", 2)',
                    "output": 2
                },
                {
                    "input": '("aabbcc", 2)',
                    "output": 4
                },
                {
                    "input": '("abcd", 0 )',
                    "output": 0
                },
                {
                    "input": '("abcdefghijklmnopqrstuvwxyz", 26)',
                    "output": 26
                },
                {
                    "input": '("aaabbaabbbaabbaabbccaababbbaacc", 18)',
                    "output": 2
                }
            ],
            "_id": ObjectId()
        }

        q2 = {
            "question": "Given integers a and b, return a to the power of b without using any build in exponentiation functions.",
            "function_signature": "def power(a: int, b: int) -> int:",
            "function_name": "power",
            "test_cases": [
                {
                    "input": "(2, 3)",
                    "output": 8
                },
                {
                    "input": "(3, 3)",
                    "output": 27
                },
                {
                    "input": "(2, 0)",
                    "output": 1
                },
                {
                    "input": "(1, 1000000)",
                    "output": 1
                }
            ],
            "_id": ObjectId()
        }

        db.insert_one(q1)
        db.insert_one(q2)
        return "done"


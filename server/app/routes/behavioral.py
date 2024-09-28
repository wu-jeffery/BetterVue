import flask
from dotenv import load_dotenv
import os
import random
from groq import Groq



def register_routes(app, client):
    model = Groq(
        api_key=os.getenv("GROQ_API_KEY"),
    )

    @app.route("/behavioral/questions/")
    def getQuestion():
        questionBank = []
        question = random.choice(questionBank)
        return flask.jsonify({"question": question})
    
    @app.route("/behavioral/judge", methods=["POST"])
    def judgeResponse():
        pass
        data = flask.request.get_json()
        question = data.get("question")
        response = data.get("response")
        prompt = f"Evaluate this candidate's usage of the STAR interview method with this response to the question: {question}. Use second-person point-of-view and address the candidate as 'you'."
        prompt += f"\n\n{response}"

        chat_completion = model.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a very strict professional recruiter for a tech company interviewing a candidate. You are giving a candidate a behavioral interview and grading each aspect of the STAR method on a scale of 1 to 10. At the end of the interview you will give an overview of how the candidate did with a percent grade. "
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model="llama3-8b-8192",
        )
        feedback = chat_completion.choices[0].message.content
        return flask.jsonify({"feedback": feedback})

    

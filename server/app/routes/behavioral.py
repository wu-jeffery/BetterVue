import flask
from dotenv import load_dotenv
import os
import random
from groq import Groq
import speech_recognition as sr
from pydub import AudioSegment

def register_behavioral_routes(app, client):
    model = Groq(
        api_key=os.getenv("GROQ_API_KEY"),
    )
    mocks = client.interview_prep.mocks
    @app.route("/behavioral/questions/")
    def getQuestion():
        questionBank = [
            "Tell me about yourself.",
            "Tell me about a time you had a disagreement with your manager.",
            "Tell me about a situation when you had a conflict with a teammate.",
            "Tell me about a time you failed. How did you deal with the situation?",
            "Describe a time when you led a team. What was the outcome?",
            "Tell me about a time you worked well under pressure.",
            "Provide an example of a time when you had to make a difficult decision.",
            "Describe a time when you went above and beyond the requirements for a project.",
            "How do you handle a situation where you don't know the answer to a question?",
            "Describe a time you received tough or critical feedback.",
            "Describe a time when you had to give someone difficult feedback. How did you handle it?",
            "Tell me about a time when you had to prioritize your tasks quickly.",
            "Describe a time when you anticipated potential problems and developed preventive measures.",
            "Describe a situation where you had to deal with a difficult customer.",
            "Tell me about a time when you missed a deadline. What happened, and how did you handle it?",
            "Describe a time when your workload was heavy and how you handled it.",
            "Tell me about a time when you had to deal with a significant change at work. How did you adapt to this change?",
            "Describe a situation where you saw a problem and took the initiative to correct it rather than waiting for someone else to do it.",
            "Describe a time when there was a conflict within your team. How did you help resolve the conflict? Did you do anything to prevent it in the future?",
            "Describe a time when you went out of your comfort zone. Why did you do it? What lessons did you learn from the experience?",
            "Describe a time when you delivered a project under a tight deadline.",
            "Describe a time when you took a big risk and it failed.",
            "How would you design/test a product to make sure it's diverse and inclusive to all users?",
            "Describe a time you had to explain a complex technical concept to someone non-technical.",
            "Tell me about a time you disagreed with a colleague. How did you handle the situation?",
            "Give an example of a time you had to collaborate effectively with a team from a different department.",
            "Tell me about a complex technical project you've worked on.",
            "How do you stay up-to-date with the latest technological advancements?",
            "Give an example of a time you had to debug a challenging technical issue.",
            "Why are you interested in working at [company name]?",
            "Assume you are given a task to design a system. How would you do it? How would you resolve ambiguity?",
            "Have you ever been in a situation where another team and yours were creating a similar product? What happened?",
            "What is the biggest technical challenge you have worked on?",
            "Why do you want to change your current company?",
            "Tell me a time when you had a different opinion than the rest of the team. How did you handle it?",
            "Tell me about a time when you were faced with a problem that had a number of possible solutions. What was the problem and how did you determine the course of action? What was the outcome of that choice?",
            "Describe a time when you needed to motivate a group of individuals or encourage collaboration during a particular project.",
            "What do you do to enhance your technical knowledge apart from your project work?",
            "How do you prioritize your workload? What do you do when your work feels like it's just too much to get done?",
            "What’s the number one accomplishment you’re most proud of?",
            "Explain the situation where you had excess work and knew you could not meet the deadline. How did you manage then?",
            "What will be your course of action if you are assigned some task which you don’t know at all?",
            "Give an example of when you took a huge risk and failed.",
            "Describe a time when you had to work simultaneously on both high-priority urgent projects as well as long-term projects. How did you go about handling both?",
            "Tell me about a time when you had a hard time working with someone in your team. How did you handle it?",
            "Tell me about a project that didn’t go according to plan.",
            "What is something new that you’ve learned recently?",
            "Tell me about a time when you had to make a decision without all the information you needed.",
            "Tell me a time when you linked two or more problems together and identified an underlying issue.",
            "Tell me about a time you made a decision to sacrifice short term gain for a longer term goal.",
            "How would you respond if you were the last member of the team in the office on a Friday afternoon and the product owner asks you to develop and deploy a change to production?"
        ]
        question = random.choice(questionBank)
        return flask.jsonify({"question": question})
    
    @app.route("/behavioral/judge/", methods=["POST"])
    def judgeResponse():
        print("received judge request")
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
        mockQuestion = {
            "question": question,
            "response": response,
            "feedback": feedback
        }
        mocks.insert_one(mockQuestion)
        return flask.jsonify({"feedback": feedback})
    


    @app.route("/behavioral/processaudio/", methods=["POST"])
    def processAudio():
        print("Received request")
        if 'audio' not in flask.request.files:
            print("No audio file provided")
            return flask.jsonify({"error": "No audio file provided"}), 400

        audio_file = flask.request.files['audio']
        if not audio_file.filename.endswith('.wav'):
            print("File is not WAV format")
            return flask.jsonify({"error": "File is not a WAV format"}), 400
        
        print(1)
        temp_path = "temp_audio"  # Temporary path for uploaded file
        print(2)
        wav_path = "audio.wav"  # Final path after 
        print(3)
        audio_file.save(temp_path)
        print(4)
        audio_segment = AudioSegment.from_file(temp_path)
        print(5)
        audio_segment.export(wav_path, format="wav")
        print(6)
        
        recognizer = sr.Recognizer()
        
        # Use the audio file with the recognizer
        with sr.AudioFile(wav_path) as source:
            try:
                audio = recognizer.record(source)  # Read the entire audio file
                print("recognized")
                # Use Google Web Speech API to recognize the audio
                text = recognizer.recognize_whisper(audio)
                print("googled")
                print(text)
                return flask.jsonify({"transcript": text}), 200
            except sr.UnknownValueError:
                print("Could not understand audio")
                return flask.jsonify({"error": "Could not understand audio"}), 400
            except sr.RequestError as e:
                print("Could not request results")
                return flask.jsonify({"error": f"Could not request results from Google Speech Recognition service; {e}"}), 500
            finally:
                print("removing shit")
                recordingPath = "uploads/recording.wav"
                if os.path.exists(recordingPath):
                    os.remove(recordingPath)
                if os.path.exists("uploads"):
                    os.rmdir("uploads")
                if os.path.exists(temp_path):
                    os.remove(temp_path)
                if os.path.exists(wav_path):
                    os.remove(wav_path)

import React from 'react';
import {useState, useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import Webcam from 'react-webcam';
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";

function AudioRecorder({qLeftTwo, handleNextQuestion, numberOfQuestions, totalTimeInSeconds, getQuestion, question}) {
    const audioChunksRef = useRef([]);
    const mediaRecorderRef = useRef(null); // Use useRef for mediaRecorder

    const startRecordingAudio = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder; // Save mediaRecorder in useRef

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const formData = new FormData();
                formData.append('audio', audioBlob, 'recording.wav');
                console.log("Sending to backend...");
                
                try {
                    const response = await fetch('http://localhost:5000/behavioral/processaudio/', {
                        method: "POST",
                        body: formData,
                        headers: {
                            'X-File-Type': 'audio/wav', // Custom header to indicate file type
                        },
                    });

                    // if (!response.ok) {
                    //     throw new Error('Network response was not ok');
                    // }
                    console.log("response was ok")
                    const data = await response.json();
                    console.log(data["transcript"]);
                    let questionData = {
                        question: question,
                        response: data["transcript"]
                    }
                    console.log("judging...")
                    const resp = await(fetch('http://localhost:5000/behavioral/judge/', {
                        method: "POST",
                        body: JSON.stringify(questionData),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }));
                    const feedback = await resp.json();
                    console.log(feedback["feedback"])
                } catch (error) {
                    console.error('Error uploading audio:', error);
                } finally {
                    audioChunksRef.current = []; // Clear chunks after sending
                }

                try{
                    
                    
                } catch (error) {
                    console.error(error)
                }
            };

            mediaRecorder.start();
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecordingAudio = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop(); // Use the ref to stop
        }
    };

    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <div className="audio-recorder w-full">
                <AudioVisuals
                    qLeftTwo={qLeftTwo}
                    numberOfQuestions={numberOfQuestions}
                    totalTimeInSeconds={totalTimeInSeconds}
                    handleNextQuestion={handleNextQuestion}
                    startRecordingAudio={startRecordingAudio}
                    stopRecordingAudio={stopRecordingAudio}
                    getQuestion={getQuestion}
                />
            </div>
        </div>
    );
}

function AudioVisuals({qLeftTwo, numberOfQuestions, totalTimeInSeconds, handleNextQuestion, startRecordingAudio, stopRecordingAudio, getQuestion}) {
    const recorderControls = useVoiceVisualizer();
    const {
        startRecording,
        stopRecording,
        recordedBlob,
        error,
    } = recorderControls;
    
    const visualizerClass = "audio-visualizer";

    // Get the recorded audio blob
    useEffect(() => {
        if (!recordedBlob) return;
    }, [recordedBlob]);

    // Get the error when it occurs
    useEffect(() => {
        if (!error) return;
        console.error(error);
    }, [error]);

    return (
        <div>
            <div className={visualizerClass}>
                <VoiceVisualizer 
                    controls={recorderControls} 
                    isControlPanelShown={false}
                    style={{
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                    className="voice-visualizer"
                />
            </div>
            <div className='flex flex-col items-center justify-center w-full'>
                <NextQuestionStartTimer 
                    currentState={qLeftTwo}
                    onNextQuestion={handleNextQuestion}
                    startRecording={startRecording}
                    stopRecording={stopRecording}
                    startRecordingAudio={startRecordingAudio}
                    stopRecordingAudio={stopRecordingAudio}
                    getQuestion={getQuestion}
                />
                <TimerBar
                    numberOfQuestions={numberOfQuestions} 
                    totalTimeInSeconds={totalTimeInSeconds} 
                    isRunning={qLeftTwo}
                    stopRecording={stopRecording}
                    stopRecordingAudio={stopRecordingAudio}
                />
            </div>
        </div>
    );
}

function VideoVisuals({videoOn, webcamRef}) {
    if (!videoOn) return;
    if (videoOn) {
        return (
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                    facingMode: 'user',
                }}
                className="mb-4 webcam-display"
            />
        );
    }
}

function NextQuestionStartTimer({ currentState, onNextQuestion, startRecording, stopRecording, startRecordingAudio, stopRecordingAudio, getQuestion }) {
    const [isRecording, setIsRecording] = useState(false);
    
    const handleClick = () => {
        onNextQuestion();

        if (isRecording) {
            // Next Question
            getQuestion();
            stopRecording();
            stopRecordingAudio();
        } else {
            startRecording();
            startRecordingAudio();
        }
        setIsRecording(!isRecording);
    };

    return (
        <div className='flex justify-center mt-5'>
            <button
                onClick={handleClick}
                className="rounded-full border text-xl p-5 w-full text-center"
            >
                {currentState == 1 ? 'Results' : (currentState % 2 == 0 ? 'Start' : 'Next Question')}
            </button>         
        </div>
    );
}

function TimerBar({ numberOfQuestions, totalTimeInSeconds, isRunning, stopRecording, stopRecordingAudio}) {
    const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);
    const [progress, setProgress] = useState(100);
    const [questionsLeft, setQuestionsLeft] = useState(numberOfQuestions);

    const stopRecordingRef = useRef(stopRecording)
    const stopRecordingAudioRef = useRef(stopRecordingAudio)

    const router = useRouter();
    
    useEffect(() => {
        stopRecordingRef.current = stopRecording;
        stopRecordingAudioRef.current = stopRecordingAudio;
    }, [stopRecording, stopRecordingAudio]);

    useEffect(() => {
        if (isRunning % 2 == 1){
            setTimeLeft(totalTimeInSeconds); // Reset timer when totalTimeInSeconds changes
        } 
    }, [totalTimeInSeconds]);

    useEffect(() => {
        if (isRunning % 2 == 0){
            setTimeLeft(totalTimeInSeconds);
            setQuestionsLeft(questionsLeft - 1);        
            // console.log("Number of questions left: ", questionsLeft);
            if (questionsLeft == 0) {
                router.push({
                    pathname: '/behavior_results',
                    query: {
                        numberOfQuestions
                    },
                });
            }
            return;
        } 
        
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    setTimeLeft(totalTimeInSeconds);
                    stopRecordingRef.current();
                    stopRecordingAudioRef.current();
                    clearInterval(interval);
                    if (questionsLeft == 0) {
                        router.push({
                            pathname: '/behavior_results',
                            query: {
                                numberOfQuestions
                            },
                        });
                        return;
                    }
                    return 0;
                } else {
                    return prevTime - 1;
                }    
            })
        }, 1000);

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [isRunning]);

    useEffect(() => {
        if (totalTimeInSeconds > 0) {
           setProgress((timeLeft / totalTimeInSeconds) * 100); 
        }
    }, [timeLeft, totalTimeInSeconds]);
    
    const formatTimeLeft = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    
    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full h-8 bg-gray-300 rounded-full overflow-hidden mt-5">
                <div
                    className="h-full bg-green-500 transition-all duration-500 ease-linear"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="text-center text-xl mt-2">
                {formatTimeLeft(timeLeft)} {/* Display formatted time left */}
            </div>
        </div>
    );
}

export default function Home() {
    const router = useRouter();
    const { numberOfQuestions, timePerQuestion, videoOn } = router.query;
    const isVideoOn = videoOn == 'true';

    const [qLeftTwo, setQLeftTwo] = useState(numberOfQuestions * 2);
    const webcamRef = useRef(null);
    
    const handleNextQuestion = () => {
        setQLeftTwo(qLeftTwo - 1);
    };

    const [question, setQuestion] = useState();

    const getQuestion = async () => {
        try{
            const res = await fetch("http://localhost:5000/behavioral/questions/", {
                method: "GET",
            });
            
            if (!res.ok){
                // console.log("sum shit broke");
                return;
            }

            let result = await res.json();
            let q = result.question;
            console.log(q);
            setQuestion(q);

        }
        catch (error){
            console.log(error);
            setQuestion("ERROR");
            return;
        }
    };

    useEffect(() => {
        getQuestion();
    }, []);

    const backToSettings = () => {
        router.push({
            pathname: '/behavioral',
            query: {},
        });
    }

    return (
      <div>
        <div className='flex align-center'>
            <button 
                onClick={backToSettings}
                className='rounded-full border text-l p-5 w-1/16 text-center m-5'
                style={{
                    backgroundColor: '#4CAF50', // Green background
                    color: 'white', // White text
                    cursor: 'pointer' // Pointer cursor on hover
                }}
            >
                Back to Settings
            </button>
            <h1 className="text-center text-6xl font-extrabold mt-5">Behavioral Practice</h1>
        </div>

        <div className="text-center my-3">
            {question}
        </div>
        
        {/* Webcam Component */}
        <div className="flex justify-center flex-col items-center mb-2">
            <VideoVisuals videoOn = {isVideoOn} webcamRef = {webcamRef}/>
        </div>
        
        {/* Audio Visualizer */}
        <div className='flex flex-col items-center justify-center w-full'>
            <AudioRecorder
                qLeftTwo={qLeftTwo}
                handleNextQuestion={handleNextQuestion}
                numberOfQuestions={numberOfQuestions}
                totalTimeInSeconds={timePerQuestion} 
                getQuestion={getQuestion}
                question={question}
            />
        </div> 
      </div>
    );
}

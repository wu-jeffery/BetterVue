import React from 'react';
import {useState, useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import Webcam from 'react-webcam';
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";

function AudioVisuals({qLeftTwo, numberOfQuestions, handleNextQuestion}) {
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
        console.log(recordedBlob);
    }, [recordedBlob]);

    // Get the error when it occurs
    useEffect(() => {
        if (!error) return;
        console.error(error);
    }, [error]);

    return (
        <div className={visualizerClass}>
            <VoiceVisualizer controls={recorderControls} isControlPanelShown={false}/>
            <NextQuestionStartTimer 
                currentState={qLeftTwo}
                onNextQuestion={handleNextQuestion}
                startRecording={startRecording}
                stopRecording={stopRecording}
            />
        </div>
    );
}

function VideoVisuals({videoOn, webcamRef}) {
    if (!videoOn) return;
    if (videoOn) {
        console.log("Camera");
        return (
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                    facingMode: 'user',
                }}
                className="mb-4"
            />
        );
    }
}

function NextQuestionStartTimer({ currentState, onNextQuestion, startRecording, stopRecording }) {
    const [isRecording, setIsRecording] = useState(false);
    
    const handleClick = () => {
        onNextQuestion();

        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
        setIsRecording(!isRecording);
    };

    return (
        <div className='flex justify-center mt-5'>
            <button
                onClick={handleClick}
                className="rounded-full border text-xl p-5 w-1/4 text-center"
            >
                {currentState == 1 ? 'Results' : (currentState % 2 == 0 ? 'Start' : 'Next Question')}
            </button>         
        </div>
    );
}

function TimerBar({ numberOfQuestions, totalTimeInSeconds, isRunning}) {
    const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);
    const [progress, setProgress] = useState(100);
    const [questionsLeft, setQuestionsLeft] = useState(numberOfQuestions);

    useEffect(() => {
        console.log(isRunning);
        if (isRunning % 2 == 1){
            setTimeLeft(totalTimeInSeconds); // Reset timer when totalTimeInSeconds changes
        } 
    }, [totalTimeInSeconds]);

    useEffect(() => {
        if (isRunning % 2 == 0){
            console.log("Stopping");
            setTimeLeft(totalTimeInSeconds);
            setQuestionsLeft(questionsLeft - 1);        
            console.log("Number of questions left: ", questionsLeft);
            if (questionsLeft == 0) {
                useRouter().push({
                    pathname: '/behavior_results',
                    query: {},
                });
            }
            return;
        } 
        
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                console.log(prevTime);
                if (prevTime <= 0) {
                    setTimeLeft(totalTimeInSeconds);
                    clearInterval(interval);
                    if (questionsLeft == 0) {
                        useRouter().push({
                            pathname: '/behavior_results',
                            query: {},
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
            <div className="text-center text-xl mt-2">
                
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

    return (
      <div>
        <h1 className="text-center text-6xl font-extrabold mt-5">Behavioral Practice</h1>

        <div className="text-center my-3">
            Question Goes Here
        </div>
        
        {/* Webcam Component */}
        <div className="flex justify-center flex-col items-center justify-center mb-2">
            <VideoVisuals videoOn = {isVideoOn} webcamRef = {webcamRef}/>
        </div>
        
        {/* Audio Visualizer */}
        <div>
            <AudioVisuals
                qLeftTwo={qLeftTwo}
                numberOfQuestions={numberOfQuestions}
                handleNextQuestion={handleNextQuestion}
            />
        </div>
        
        {/* TimerBar Component */}
        <div className="flex flex-col items-center justify-center w-full">
            <TimerBar 
                numberOfQuestions={numberOfQuestions} 
                totalTimeInSeconds={timePerQuestion} 
                isRunning={qLeftTwo}
            />
        </div>
      </div>
    );
}

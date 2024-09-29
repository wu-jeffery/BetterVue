import React, { useRef, useState } from 'react';

export default function AudioRecorder() {
    const [isRecording, setIsRecording] = useState(false);
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
                console.log(audioBlob.type);
                
                try {
                    const response = await fetch('https://my-project-mocha-alpha.vercel.app/behavioral/processaudio/', {
                        method: "POST",
                        body: formData,
                        headers: {
                            'X-File-Type': 'audio/wav', // Custom header to indicate file type
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    console.log(data["transcript"]);
                } catch (error) {
                    console.error('Error uploading audio:', error);
                } finally {
                    audioChunksRef.current = []; // Clear chunks after sending
                }
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecordingAudio = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop(); // Use the ref to stop
            setIsRecording(false);
        }
    };

    return (
        <div className="audio-recorder">
            <h2>Audio Recorder</h2>
            <button onClick={isRecording ? stopRecordingAudio : startRecordingAudio}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
        </div>
    );
}

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const [numberOfQuestions, setNumberOfQuestions] = useState(3);
  const [timePerQuestion, setTimePerQuestion]= useState(30);
  const [videoOn, setVideoOn] = useState(false);
  const router = useRouter();
  
  const handleInterviewStart = () => { 
    console.log("Interview Started!");
    console.log(numberOfQuestions);
    console.log(timePerQuestion);
    console.log(videoOn);
    router.push({
      pathname: '/behavior_practice',
      query: {
        numberOfQuestions,
        timePerQuestion,
        videoOn
      },
    });
  };

  const handleToggle = () => {
    setVideoOn(prevVideoOn => {
      const newVideoOn = !prevVideoOn;
      console.log("Video On (after toggle):", newVideoOn); // this shows the correct updated value
      return newVideoOn;
    });
  };

  return (
    <div>
      <h1 className="text-center text-6xl font-extrabold my-5">Behavioral Settings</h1>

      <div className='h-full w-full flex flex-col items-center justify-center space-y-10'>
        <Link href="/login/" className='rounded border text-xl p-5 w-1/4 text-center'>
            Create an account to start practicing!
        </Link>
        <Link href="/" className='rounded border text-xl p-5 w-1/4 text-center bg-gradient-to-br from-pink-500 to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
          <button className=''>
            Home
          </button> 
        </Link>
        
      </div>

      <div className="flex flex-col items-center my-10 rounded border p-5">
        <h2 className="text-2xl font-bold mb-4">Set Interview Parameters</h2>

        {/*Setting number of Questions*/}
        <div className="mb-5">
          <label className="text-xl mr-2">Number of Questions:</label>
          <input
            type="number"
            min="1"
            max="10"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            className="border p-2 rounded number-input"
          />
        </div>
        
        {/*Setting Time*/}
        <div className="mb-5">
          <label className="text-xl mr-2">Time per Question (seconds):</label>
          <input
            type="range"
            min="10"
            max="120"
            value={timePerQuestion}
            onChange={(e) => setTimePerQuestion(Number(e.target.value))}
            className="slider"
          />
          <span className="ml-2 text-xl">{timePerQuestion} s</span>
        </div>

        {/*Video On/off*/}
        <div className="mb-5">
        <label className="text-xl mr-2">Video On?</label>
        <input
            type="checkbox" 
            checked={videoOn}
            onChange={handleToggle}
            className="mr-2"
          />
        </div>

      </div>

      {/*Start Interview Button*/}
      <div className="flex justify-center">
        <button 
          onClick={handleInterviewStart} 
          className='rounded-full border text-xl p-5 w-1/4 text-center'
          style={{
            backgroundColor: '#4CAF50', // Green background
            color: 'white', // White text
            cursor: 'pointer' // Pointer cursor on hover
          }}
        >
          Start Interview
        </button>
      </div>
      
    </div>
  );
}
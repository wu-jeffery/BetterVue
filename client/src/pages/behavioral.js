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
    // console.log("Interview Started!");
    // console.log(numberOfQuestions);
    // console.log(timePerQuestion);
    // console.log(videoOn);
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
      <div className="absolute ellipse-gradient w-full h-full"></div>
      <div className="h-1/6 w-full flex flex-row justify-between my-8">
        <Link href="/" className="flex w-1/3 p-6 pl-20 text-3xl items-center">
          BetterVue
        </Link>
        <h1 className="w-8/12 text-6xl font-extrabold my-5"> Behavioral Settings </h1>
      </div>

      <div className='flex justify-center w-full h-1/2 my-10'>
        <div className="w-full max-w-4/12 flex flex-col items-center justify-center rounded-lg border p-6">
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
      </div>

      {/*Start Interview Button*/}
      <div className="h-4/12 flex justify-center">
        <button 
          onClick={handleInterviewStart} 
          className='rounded-full border text-xl p-5 w-1/4 text-center start-button'
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}
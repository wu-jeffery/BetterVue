import React from 'react';
import {useState, useEffect, useRef} from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    const { numberOfQuestions } = router.query;
    const questionCount = parseInt(numberOfQuestions, 10) || 0;
    const questionsList = Array.from({ length: questionCount }, (_, index) => `Question ${index + 1}:`);

    const backToSettings = () => {
        router.push({
            pathname: '/behavioral',
            query: {},
        });
    }

    const getResults = async () => {
        let user = await fetch('http://localhost:5000/users/verify/', {
            method: "POST",
            body: JSON.stringify({
                token: localStorage.getItem("token"),
            })
        })
        user = await user.json()
        user = user["username"]

        let body = {
            username: user,
            numQuestions: numberOfQuestions
        }

        let result = await fetch('http://localhost:5000/behavioral/results/', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
        

    }

    return(
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
                <h1 className="text-center text-6xl font-extrabold mt-5">Behavioral Results</h1>
            </div>
            <ol className="list-decimal pl-5">
                {questionsList.map((question, index) => (
                    <li key={index} className="mb-2">
                        questions and feedback go here
                    </li>
                ))}
            </ol>
        </div>
    )
}
import React from 'react';
import {useState, useEffect, useRef} from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    const { numberOfQuestions } = router.query;
    const questionCount = parseInt(numberOfQuestions, 10) || 0;

    const[questionsList, setQuestionsList] = useState([]);

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
        });
        user = await user.json();
        user = user["username"];

        let body = {
            username: user,
            numQuestions: numberOfQuestions
        };

        let result = await fetch('http://localhost:5000/behavioral/results/', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = result.json();

        const qList = Object.entries(result.questions)
        setQuestionsList(qList)
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
                {questionsList.map(([question, feedback], index) => (
                    <li key={index} className="mb-2">
                        <strong>{question}</strong> - {feedback} {/* Display question and feedback */}
                    </li>
                ))}
            </ol>
        </div>
    )
}
import React from 'react';
import {useState, useEffect, useRef} from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    const numQuestions = localStorage.getItem('numQ')
    const numQ = parseInt(numQuestions, 10)

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
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        user = await user.json();
        user = user["username"];
        console.log(user)
        console.log(numQ)

        let body = {
            username: user,
            numQuestions: numQ,
        };
        console.log("fetching results")
        let result = await fetch('http://localhost:5000/behavioral/results/', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json();

        const qList = Object.entries(result.questions)
        setQuestionsList(qList)
    }

    useEffect(() => {
        getResults();
    }, []);

    return(
        <div>
            <div className="absolute ellipse-gradient w-[2000px] h-[2000px] top-[800px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
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
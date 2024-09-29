import React from 'react';
import {useState, useEffect, useRef} from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    let numQuestions;
    const numQ = parseInt(numQuestions, 10)
    const [resultsReady, setReady] = useState(false)

    const[questionsList, setQuestionsList] = useState([]);

    const backToSettings = () => {
        router.push({
            pathname: '/behavioral',
            query: {},
        });
    }

    useEffect(() =>{
        numQuestions = localStorage.getItem('numQ');
        const checkCondition = () => {
            const itemValue = localStorage.getItem("ready");
            if (itemValue === "true") {
                setReady(true);
            }
        };

        // Initial check
        checkCondition();

        // Set an interval to check every 100 milliseconds
        const intervalId = setInterval(checkCondition, 100);

        // Clean up the interval on unmount or when the condition is met
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (resultsReady) {
            getResults();
        }
    }, [resultsReady]); // Run when conditionMet changes

    const getResults = async () => {
        let token;
        if (global?.window !== undefined) {
            token = localStorage.setItem("token", result.token);   
        }
        let user = await fetch('https://my-project-mocha-alpha.vercel.app/users/verify/', {
            method: "POST",
            body: JSON.stringify({
                token: token,
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
        let result = await fetch('https://my-project-mocha-alpha.vercel.app/behavioral/results/', {
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
        if (localStorage.getItem("ready") == "true"){
            console.log("RESULTS RESULTS RESULTS")
            getResults();
        }
    }, [localStorage.getItem("ready")]);

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
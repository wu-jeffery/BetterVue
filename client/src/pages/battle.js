import React, { useState, useEffect } from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';
import verify from "./verify";

export default function Battle() {
    const socket = io('http://localhost:5000');
    const [question, setQuestion] = useState("");
    const [functionSignature, setFunctionSignature] = useState('');
    const [qid, setqId] = useState("");
    const [score, setScore] = useState("");
    const [error, setError] = useState("");
    const [username, setUsername] = useState('');
    const [opponent, setOpponent] = useState('');

    const router = useRouter();

    const { id, sid } = router.query;

    useEffect(() => {
        socket.on("post_match", (data) => {
            if (data.players.includes(username)) {
                if (data.winner === username) {
                    localStorage.setItem("result", "win");
                } else {
                    localStorage.setItem("result", "lose");
                }
                router.push("/postmatch/")
            }
        });
    }, [username]);

    useEffect(() => {
        async function get_opponent() {
            if (username && id) {
                const res = await fetch('http://localhost:5000/matchmaking/opponent/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        session_id: sid,
                        username: username
                    })
                });
                const result = await res.json();
                setOpponent(result.opponent);
            }
        }

        get_opponent();
    }, [username, id])

    useEffect(() => {
        async function get_question() {
            const response = await fetch('http://localhost:5000/battle/questions/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    index: id
                })
            });
            const result = await response.json();

            console.log(result);
            
            setQuestion(result.question);
            setFunctionSignature(result.function_signature);
            setqId(result.id);
        }

        if (id) {
            get_question();
        }
    }, [id]);

    useEffect(() => {
        verify().then((res) => {
            setUsername(res);
        });
    }, []);

    async function submit() {
        const code = window.monaco.editor.getModels()[0].getValue();
        const response = await fetch('http://localhost:5000/battle/execute/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                source_code: code,
                question_id: qid
            })
        });

        const result = await response.json();

        if (result.score[0] === 'A') {
            console.log("sending battle_end");
            socket.emit('battle_end', { session_id: sid, winner: username });
        }

        setScore(result.score);
        setError(result.error);
    }

    return (
        <div className='flex flex-row h-screen w-full bg-slate-200'>
            <div className='flex flex-col justify-between w-1/3 text-xl'>
                <div className="m-4 text-black">
                    {question}
                </div>
                <div className='align-end text-black m-4'>
                    Opponent: {opponent}
                </div>
            </div>
            <div className='flex flex-col w-2/3 bg-slate-300'>
                <div className='h-2/3'>
                    {functionSignature && (
                        <Editor defaultLanguage='Python' defaultValue={functionSignature}>
                        </Editor>
                    )}
                </div>
                <div className='m-4 text-red-600 bg-yellow w-5/6'>
                    {score}
                    {error}
                </div>
            </div>
            
            <button 
                className="border rounded text-xl px-4 py-2 absolute bottom-10 right-10 text-black bg-blue-400 hover:bg-blue-500"
                onClick={submit}
            >
                Submit
            </button>
        </div>    
    );
}
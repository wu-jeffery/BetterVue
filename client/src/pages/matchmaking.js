import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import verify from "./verify";
import { useRouter } from 'next/router';

export default function Matchmaking() {
    const socket = io('http://localhost:5000');
    const [sessionId, setSessionId] = useState('');
    const [userId, setUserId] = useState('');
    const [status, setStatus] = useState('Waiting for another user...');
    const [code, setCode] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (username) {
            socket.on('match_found', (data) => {
                console.log(data.players);
                console.log(username);
                if (data.players.includes(username)) {
                    router.push("/battle/?id=" + data.question_id + "&sid=" + data.session_id);
                }
            });

            return () => {
                socket.off("match_found");
            };
        }
    }, [username]);

    useEffect(() => {
        if (username) {
            socket.emit('join', { username: username });
        }
    }, [username]);

    useEffect(() => {
        verify().then((res) => {
            setUsername(res);
        });
    }, []);

    return (
        <div className="flex h-screen items-center justify-center w-screen">
            <h1 className="text-5xl">Finding match...</h1>
        </div>
    );
}
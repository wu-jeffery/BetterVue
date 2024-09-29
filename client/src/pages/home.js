import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
    let router = useRouter();
    const [username, setUsername] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        console.log("test1")
        if (username) {
            console.log("test2")
            async function get_user() {
                const res = await fetch("http://localhost:5000/users/info/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username
                    })
                });
                const result = await res.json();
                setUser(result);
            }

            get_user();
        }
    }, [username])

    useEffect(() => {
        async function verify() {
            const res = await fetch("http://localhost:5000/users/verify/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                }),
            });
            
            if (!res.ok) {
                router.push("/login/");
            }
        
            let result = await res.json();
            setUsername(result.username);
        }

        verify();
    }, []);

    return (
        <div className="flex flex-row h-screen w-screen justify-center items-center ellipse-gradient">
            <div className="flex flex-col h-full w-5/6 items-start space-y-24 p-20">
                <div className="text-5xl">
                    Welcome, {username}!
                </div>
                <div className="text-xl border p-4 rounded-md">
                    <Link href="/matchmaking/">Find a match (coding battle!)</Link>
                </div>
                <div className="text-xl border p-4 rounded-md">
                    <Link href="/behavioral/">Practice behavioral</Link>
                </div>
            </div>
            <div className="flex flex-col h-full w-full justify-center items-center">
                <div className="w-1/2 border rounded flex flex-col">
                    <div className="text-xl p-4">
                        Your ELO: {user.ELO}
                    </div>
                    <div className="text-xl p-4">
                        You have {user.questions_done / 2} questions done.
                    </div>
                </div>
            </div>
        </div>
    );
}

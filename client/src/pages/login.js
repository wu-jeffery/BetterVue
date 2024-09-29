import React, { useEffect, useState } from "react";
import '/tailwind.config.js'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [wrong, setWrong] = useState();

    
    async function handleLogin(e){
        let userData = {
            username: user,
            password: password,
            email: user
        }
        try {
            const res = await fetch("https://my-project-mocha-alpha.vercel.app/users/login/", {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            let result = await res.json();
            if (global?.window !== undefined) {
                localStorage.setItem("token", result.token);   
            }
        } catch {
            setWrong(true);
            console.log("error");
            return;
        }
        console.log("logged in!");
        router.push("/home/");
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center ellipse-gradient">
            <div className="w-1/3 border rounded-md bg-black flex flex-col items-center justify-center">
                <div className="p-4 text-3xl">
                    Login
                </div>
                <div className="h-full w-full flex flex-col justify-items-center items-start space-y-5">
                    <div className="w-full p-4 pb-0">
                        <p>Username/email: </p>
                        <input type="text" className={`w-full rounded-md border p-2 ${user ? "bg-green-900" : "bg-black"}`} placeholder="Enter username/email here"
                        onChange={(e) => {
                            setUser(e.target.value);
                            setWrong(false);
                        }}></input>
                    </div>

                    <div className="w-full px-4">
                        <p>Password: </p>
                        <input type="password" className={`w-full rounded-md border p-2 ${password ? "bg-green-900" : "bg-black"}`} placeholder="Enter password here"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setWrong(false);
                        }}></input>
                    </div>

                    <div className="flex flex-col w-full h-full items-center justify-items-center py-4 space-y-4">
                        <div>
                            {wrong && <p className="text-red-600">incorrect login</p>}
                        </div>
                        <div>
                            <button className="rounded border px-4 py-2 hover:bg-green-900" onClick={handleLogin}>LOGIN</button>
                        </div>
                        <div>
                            <Link href="/create_account/" className="hover:text-green-700">Need to create an account?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
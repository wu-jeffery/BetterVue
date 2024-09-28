import Link from "next/link";
import React, { useState } from "react";

export default function create_account() {
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    async function submit() {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
    }

    return(
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="border rounded-md w-1/3 flex flex-col justify-items-center items-start space-y-5">
                <div className="w-full p-4 pb-0">
                    <p>Email: </p>
                    <input 
                        type="text" 
                        className="w-full rounded rounded-md bg-bgLight dark:bg-bgDark border p-2" 
                        placeholder="Enter email here" 
                        onChange={(e) => {setEmail(e.target.value)}}
                    ></input>
                </div>

                <div className="w-full px-4">
                    <p>Username: </p>
                    <input 
                        type="text" 
                        className="w-full rounded rounded-md bg-bgLight dark:bg-bgDark border p-2" 
                        placeholder="Enter username here" 
                        onChange={(e) => {setUsername(e.target.value)}}
                    ></input>
                </div>

                <div className="w-full px-4">
                    <p>Password: </p>
                    <input type="text" 
                        className="w-full rounded rounded-md bg-bgLight dark:bg-bgDark border p-2" 
                        placeholder="Enter password here" 
                        onChange={(e) => {setPassword(e.target.value)}}
                    ></input>
                </div>

                <div className="w-full p-4 pt-0">
                    <p>Confirm Password: </p>
                    <input type="text" 
                        className="w-full rounded rounded-md bg-bgLight dark:bg-bgDark border p-2" 
                        placeholder="Confirm password here" 
                        onChange={(e) => {setConfirmPassword(e.target.value)}}
                    ></input>
                </div>

                <div className="flex flex-col w-full h-full items-center justify-items-center pb-4">
                    <div>
                        <button className="rounded-xl h-full w-full text-textDark">CREATE ACCOUNT</button>
                    </div>
                    <div>
                        <Link href="/login/">Already have an account?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
import React, { useEffect, useState } from "react";
import '/tailwind.config.js'
import Link from 'next/link'

export default function Login() {
    
    const [user, setUser] = useState();
    const [password, setPassword] = useState();

    
    async function handleSubmit(e){
        console.log("hi")
        let userData = {
            username: user,
            password: password,
            email: "blank"
        };

        const res = await fetch("http://localhost:5000/users/login/", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        let result = await res.JSON;
        console.log(result);
    }

    return (
    <main>
        <div className={`absolute top-1/4 left-1/4 bg-sidebarLight dark:bg-sidebarDark h-1/2 w-1/2 rounded-2xl text-xl border-4 border-header`}>
            <p className = {`absolute top-2/12 left-1/12`}>name: </p>
            <input type='text' className={`shadow appearance-none border rounded py-2 px-3 absolute top-3/12 left-1/12 w-10/12 focus:outline-none bg-bgLight dark:bg-bgDark`} placeholder='Enter ur shit here mf'
            onChange={(e) => {
                setUser(e.target.value)
            }}
            />
            
            <p className = {`absolute top-6/12 left-1/12`}>password: </p>
            <input type='text' className={`shadow appearance-none border rounded py-2 px-3 absolute top-7/12 left-1/12 bg-bgLight dark:bg-bgDark w-10/12 focus:outline-none`} placeholder='enter passwrod pls :D'
            onChange={(e) => {
                setPassword(e.target.value)
            }}
            />
            
            <div className={`absolute top-10/12 w-full h-1/12 flex flex-col items-center justify-center`}>

                <div>
                    <button className={`bg-header m-1 rounded-xl h-full w-full border-header text-textDark`} onClick={handleSubmit}>LOGIN</button>
                </div>
                <div>
                    <Link href="/create_account/">Need to create an account?</Link>
                </div>
            </div>
        </div>
    </main>
    );
}
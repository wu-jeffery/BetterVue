import React, { useEffect, useState } from "react";
import '/tailwind.config.js'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter();
    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    const [wrong, setWrong] = useState();

    
    async function handleLogin(e){
        console.log("hi")
        let userData = {
            username: user,
            password: password,
            email: user
        }
        try {
            const res = await fetch("http://localhost:5000/users/login/", {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            let result = await res.json();
            localStorage.setItem("token", result.token);
        } catch {
            setWrong(true);
            console.log("error");
            return;
        }
        console.log("logged in!");
        router.push("/home/");
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="border rounded-md w-1/3 flex flex-col justify-items-center items-start space-y-5">
                <div className="w-full px-4">
                    <p>Username/email: </p>
                    <input type="text" className="w-full rounded-md bg-bgLight dark:bg-bgDark border p-2" placeholder="Enter username/email here"
                    onChange={(e) => {
                        setUser(e.target.value);
                        setWrong(false);
                    }}></input>
                </div>

                <div className="w-full px-4">
                    <p>Password: </p>
                    <input type="text" className="w-full rounded-md bg-bgLight dark:bg-bgDark border p-2" placeholder="Enter password here"
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setWrong(false);
                    }}></input>
                </div>

                <div className="flex flex-col w-full h-full items-center justify-items-center pb-4">
                    <div>
                        {wrong && <p className="text-red-600">incorrect login</p>}
                    </div>
                    <div>
                        <button className={`rounded-xl h-full w-full text-textDark`} onClick={handleLogin}>LOGIN</button>
                    </div>
                    <div>
                        <Link href="/create_account/">Need to create an account?</Link>
                    </div>
                </div>
            </div>
        </div>
    // <main>
    //     <div className={`absolute top-1/4 left-1/4 bg-sidebarLight dark:bg-sidebarDark h-1/2 w-1/2 rounded-2xl text-xl border-4 border-header`}>
    //         <p className = {`absolute top-2/12 left-1/12`}>name: </p>
    //         <input type='text' className={`shadow appearance-none border rounded py-2 px-3 absolute top-3/12 left-1/12 w-10/12 focus:outline-none bg-bgLight dark:bg-bgDark`} placeholder='Enter ur shit here mf'
    //         onChange={(e) => {
    //             setUser(e.target.value)
    //         }}
    //         />
            
    //         <p className = {`absolute top-6/12 left-1/12`}>password: </p>
    //         <input type='text' className={`shadow appearance-none border rounded py-2 px-3 absolute top-7/12 left-1/12 bg-bgLight dark:bg-bgDark w-10/12 focus:outline-none`} placeholder='enter passwrod pls :D'
    //         onChange={(e) => {
    //             setPassword(e.target.value)
    //         }}
    //         />
            
    //         <div className={`absolute top-10/12 w-full h-1/12 flex flex-col items-center justify-center`}>

    //             <div>
    //                 <button className={`border border-md p-2 m-1 rounded-xl h-full w-full text-textDark`} onClick={handleSubmit}>LOGIN</button>
    //             </div>
    //             <div>
    //                 <Link href="/create_account/">Need to create an account?</Link>
    //             </div>
    //         </div>
    //     </div>
    // </main>
    );
}
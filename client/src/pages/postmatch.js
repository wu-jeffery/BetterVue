import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PostMatch() {
    const [result, setResult] = useState("");

    useEffect(() => {
        setResult(localStorage.getItem("result"));
    }, []);

    return (
        <div className="flex flex-col h-screen items-center justify-center w-screen space-y-10 ellipse-gradient">
            <h1 className="text-5xl">Match Over</h1>
            <div className="text-xl">
                {(result === "win") ? "You won!" : "You lost! Practice more and try again!"}
            </div>
            <Link href="/home/">
                <button className="border rounded px-4 py-2 text-xl">
                    Home
                </button>
            </Link>
        </div>
    );
}
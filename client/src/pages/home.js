import verify from "./verify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
    let router = useRouter();
    const [username, setUsername] = useState("");
    useEffect((router) => {
        verify().then((res) => {
            setUsername(res);
        });
    }, []);

    return (
        <div className="flex flex-col h-screen w-screen justify-center items-center space-y-24">
            <div className="text-xl border p-4 rounded-md">
                <Link href="/matchmaking/">Find a match (coding battle!)</Link>
            </div>
            <div className="text-xl border p-4 rounded-md">
                <Link href="/behavioral/">Practice behavioral</Link>
            </div>
            <div>
                Username: {username}
            </div>
        </div>
    );
}

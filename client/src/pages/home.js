import verify from "./verify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
    let router = useRouter();
    const [username, setUsername] = useState("");
    useEffect((router) => {
        verify().then((res) => {
            setUsername(res);
        });
    }, []);

    return (
        <div>
            <h1>Welcome {username}</h1>
        </div>
    );
}

import { useRouter } from "next/router";
export default async function Verify(router) {
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
    return result.username;
}
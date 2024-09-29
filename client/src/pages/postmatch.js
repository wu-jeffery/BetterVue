import Link from "next/link";

export default function PostMatch() {
    return (
        <div className="flex flex-col h-screen items-center justify-center w-screen space-y-10">
            <h1 className="text-5xl">Match Over</h1>
            <Link href="/home/">
                <button className="border rounded p-4">
                    Home
                </button>
            </Link>
        </div>
    );
}
import Link from "next/link";

export default function create_account() {
    return(
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="border rounded-md w-1/3 flex flex-col justify-items-center items-start space-y-5">
                <div className="w-full p-4 pb-0">
                    <p>Email: </p>
                    <input type="text" className="w-full rounded rounded-md bg-bgLight dark:bg-bgDark border p-2" placeholder="Enter email here"></input>
                </div>

                <div className="w-full px-4">
                    <p>Username: </p>
                    <input type="text" className="w-full rounded rounded-md bg-bgLight dark:bg-bgDark border p-2" placeholder="Enter username here"></input>
                </div>

                <div className="w-full px-4">
                    <p>Password: </p>
                    <input type="text" className="w-full rounded rounded-md bg-bgLight dark:bg-bgDark border p-2" placeholder="Enter password here"></input>
                </div>

                <div className="w-full p-4 pt-0">
                    <p>Confirm Password: </p>
                    <input type="text" className="w-full rounded rounded-md bg-bgLight dark:bg-bgDark border p-2" placeholder="Confirm password here"></input>
                </div>

                <div className="flex flex-col w-full h-full items-center justify-items-center pb-4">
                    <div>
                        <button className={`rounded-xl h-full w-full text-textDark`}>CREATE ACCOUNT</button>
                    </div>
                    <div>
                        <Link href="/login/">Already have an account?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
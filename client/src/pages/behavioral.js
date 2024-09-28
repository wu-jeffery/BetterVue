import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      	<h1 className="text-center items-center justify-center text-6xl font-extrabold my-5">Behavioral Practice</h1>
        <div className='p-5 border'>
            <Link href="/login/">
                Create an account to start practicing!
            </Link>
        </div>
        <Link href="/" className='m-5'>
            Home
        </Link>
    </div>
  );
}

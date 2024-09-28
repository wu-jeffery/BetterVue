import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      	<h1 className="text-center text-6xl font-extrabold my-5">Behavioral Practice</h1>
        <div className='my-10 mx-20 border-spacing-5'>
            <Link href="/login/">
                Create an account to start practicing!w
            </Link>
        </div>
        <Link href="/" className='m-5'>
            Home
        </Link>
    </div>
  );
}

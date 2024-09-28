import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      	<h1 className="text-center text-6xl">Behavioral Practice</h1>
        <Link href="/login/" className='m-5'>
            Create an account to start practicing!
        </Link>
        <Link href="/" className='m-5'>
            <Image> </Image>
            Home
        </Link>
    </div>
  );
}

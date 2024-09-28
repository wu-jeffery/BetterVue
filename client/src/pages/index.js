import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      	<h1 className="text-center text-6xl">Interview Prep Website</h1>
		<Link href="/login/" className='rounded'>
			Go to login
		</Link>
    <div className='m-10'>
      <Link href="/behavioral/" className=''> 
        Behavioral Prep
      </Link>
    </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center">
      	<h1 className="flex h-1/4 text-center text-6xl items-center justify-center">top text</h1>
		<div className='h-full w-full flex flex-col items-center justify-center space-y-10'>
			<Link href="/login/" className='rounded border text-xl p-5 w-1/4 text-center'>
				Go to login
			</Link>
			<Link href="/create_account/" className='rounded border text-xl p-5 w-1/4 text-center'>
				Create an account!
			</Link>
			<Link href="/behavioral/" className='rounded border text-xl p-5 w-1/4 text-center'>
				Practice behaviorals!
			</Link>
		</div>
		
    </div>
  );
}

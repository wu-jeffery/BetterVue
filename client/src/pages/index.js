import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center">
		<div className="h-1/6 w-full flex flex-row justify-between">
			<h1 className="flex w-1/2 p-6 pl-20 text-3xl items-center">BetterVue</h1>
			<div className="w-1/4"></div>
			<div className="w-1/4 flex flex-row space-x-5 justify-center items-center">
				<Link href="/login/" className='p-5'>
					Login
				</Link>
				<Link href="/create_account/" className='p-5'>
					Register
				</Link>
			</div>
		</div>
      	
		<div className='h-1/4 w-1/3 text-center text-4xl flex flex-col items-center justify-center space-y-10'>
			Practice behavioral interviews or race in technical interviews
		</div>
		
    </div>
  );
}

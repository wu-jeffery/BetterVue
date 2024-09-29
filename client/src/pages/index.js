import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center ellipse-gradient">
		<div className="h-1/6 w-full flex flex-row justify-between">
			<h1 className="flex w-1/2 p-6 pl-20 text-3xl items-center">BetterVue</h1>
			<div className="w-1/4"></div>
			<div className="w-1/4 flex flex-row space-x-5 justify-center items-center">
				<Link href="/login/" className='p-5 hover:text-green-700'>
					Login
				</Link>
				<Link href="/create_account/" className='p-5 hover:text-green-700'>
					Register
				</Link>
			</div>
		</div>
      	
		<div className='h-1/4 w-1/3 text-center text-5xl flex flex-col items-center justify-center space-y-10 drop-shadow-xl'>
			Practice behavioral interviews or race in technical interviews
		</div>
		<div className="text-xl drop-shadow-xl">
			An innovative approach to preparing for SWE interviews
		</div>
		<Link href="/login/" className='text-2xl mt-24 p-5 border rounded-lg bg-black hover:bg-neutral-800'>
			Get started
		</Link>
    </div>
  );
}

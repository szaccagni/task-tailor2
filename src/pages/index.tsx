import type { Todo } from '../utils/types'
import { useUser, } from '@clerk/nextjs'
import NavBar from "~/components/NavBar";
import CreateTodo from "~/components/CreateTodo";
import Todos from "~/components/Todos";
import { useState } from "react";


const Greeting = () => {
  // Use the useUser hook to get the Clerk.user object
  const { isLoaded, isSignedIn } = useUser()
  const [showComponents, setShowComponents] = useState('todos')

  if (!isLoaded) {
    return (<div>loading...</div>)
  } else if (!isSignedIn) {
    return (
      <div className="relative">
        <img src='/needle-black.png' className='opacity-50' alt='needle and thread'></img>
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-cente font-bold text-6xl">Sign Up / Sign In to Begin Tailoring Your Tasks</h3>
        </div>

      </div>)
  } else {
    return (
      <>
        {
          showComponents === 'todos' &&
          <div className="w-2/5">
            <Todos setShowComponents={setShowComponents} />
          </div>
        }
        {showComponents === 'create' && <CreateTodo setShowComponents={setShowComponents} />}
      </>
    )
  }
}

export default function Home() {
  return (
    <>
      <NavBar />
      <div className='relative h-screen flex items-center justify-center overflow-x-hidden flex-col'>
        <Greeting />
      </div>
    </>
  );
}

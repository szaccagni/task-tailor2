import Head from "next/head";
import { useUser,  } from '@clerk/nextjs'
import NavBar from "~/components/NavBar";


const Greeting = () => {
  // Use the useUser hook to get the Clerk.user object
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return (<div>loading</div>)
  } else if (!isSignedIn) {
    return(<div>not signed in</div>)
  } else {
    return (<div>test</div>)
  }
}

export default function Home() {
  return (
    <>
      <NavBar />
      <div className='relative h-screen flex items-center justify-center overflow-x-hidden'>
        <Greeting />
      </div>
    </>
  );
}

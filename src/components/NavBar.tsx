import { SignInButton, SignedOut, UserButton, useUser } from '@clerk/nextjs'

export default function NavBar() {
    const { isSignedIn } = useUser()

    return (
        <div className='fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between'>
            <div className='container mx-auto w-full flex justify-between items-center'>
                <div className='flex items-center'>
                    <img src='/needle-black.png' className='w-10'></img>
                    <div>Task Tailor</div>
                </div>
                <div className='flex items-center'>
                    <div className="w-10 mr-5 cursor-pointer" onClick={() => window.open('https://github.com/szaccagni/task-tailor2', '_blank')}>
                        <img src="/github-logo.png" alt="GitHub Logo" />
                    </div>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Sign in
                            </button>
                        </SignInButton>
                    </SignedOut>
                    {isSignedIn &&
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: {
                                        width: 56,
                                        height: 56
                                    }
                                }
                            }}
                            afterSignOutUrl='/'
                        />
                    }
                </div>

            </div>
        </div>
    )
}
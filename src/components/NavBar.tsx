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
                <SignedOut>
                    <SignInButton mode="modal"></SignInButton>
                </SignedOut>
                { isSignedIn && 
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
    )
}
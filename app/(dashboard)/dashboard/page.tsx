'use client'

import { useSession, signOut } from 'next-auth/react'

import { useState } from 'react'

import Image from 'next/image'
import { redirect } from 'next/navigation'

export default function Dashboard() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/')
        }
    })

    const [isDropdownOpen, setIsDropdownOpen] = useState(true);

    return (
        <div data-aos="fade-up" data-aos-duration="500" className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                {/* Sidebar content here */}
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex justify-between items-center p-4 bg-white shadow">
                    <div className="font-bold text-xl">Dashboard</div>
                    <div className="relative">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <Image
                                src={session?.user?.image || ''}
                                alt="Profile"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    {session?.user?.name}
                                </a>
                                <a href="#" onClick={() => signOut({callbackUrl: "/"})} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Sign out
                                </a>
                            </div>
                        )}
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    {/* Content goes here */}
                </main>
            </div>
        </div>
    );
}

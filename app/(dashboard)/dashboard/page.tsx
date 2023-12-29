'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import React from 'react';
import { Switch, Button } from "@nextui-org/react";

export default function Dashboard() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/');
        }
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen">
            {/* Sidebar
            {isSidebarOpen && (
              <div className="w-64 bg-gradient-to-r from-teal-600 to-blue-00 text-white shadow-lg px-4 py-6">
                  <div className="font-bold text-2xl mb-6">Folio AI</div>
                  <ul className="space-y-4">
                    <li className="hover:text-blue-300 cursor-pointer">Dashboard</li>
                    <li className="hover:text-blue-300 cursor-pointer">Create Resume</li>
                    <li className="hover:text-blue-300 cursor-pointer">My Resumes</li>
                    <li className="hover:text-blue-300 cursor-pointer">Job Applications</li>
                    <li className="hover:text-blue-300 cursor-pointer">Analytics</li>
                  </ul>
              </div>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                {/* <header className="flex justify-between items-center p-4 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-md">
                    <div onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="cursor-pointer">
                      <Image src="/path-to-your-logo.svg" alt="Folio AI Logo" width={40} height={40} />
                    </div>
                    <div className="flex items-center">
                      <input type="text" placeholder="Search..." className="form-input mr-4" />
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
                    </div>
                </header> */}

                {/* Page content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
                    {/* <div className="mb-6">
                      <h2 className="text-3xl font-semibold text-gray-800">Welcome, {session?.user?.name}!</h2>
                      <Button color="primary">
                        Press Me
                      </Button>

                      <Switch defaultSelected aria-label="Automatic updates"/>
                      <p className="text-gray-600 mt-1">Here's your AI insight of the day...</p>
                    </div> */}
                </main>
            </div> 
        </div>
    );
}

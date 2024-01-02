'use client'

import Link from 'next/link'

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

import { redirect } from 'next/navigation'

import { motion } from "framer-motion"
import { Input, Button } from '@nextui-org/react';


export default function SignIn() {
  const { data: session } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setLoginError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    });

    if (result) {
      if (result.error) {
        // Handle error responses here
        setLoginError(result.error);
        console.log('Failed to log in:', result.error);
      } else {
        // Redirect the user after successful login
        redirect('/dashboard');
      }
    }

    setLoading(false);
  };

  if (session) {
    return redirect('/dashboard');
  }

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div data-aos="fade-up" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-12">
            <h1 className="h1 mb-2">Sign In</h1>
            {/* <p className="italic">Use the providers below to sign-in quickly.</p> */}
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      signIn('github');
                    }}
                    className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
                    <svg className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
                    </svg>
                    <span className="flex-auto pl-16 pr-8 -ml-16">Continue with GitHub</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                  <button 
                      onClick={(e) => {
                          e.preventDefault();
                          signIn('google');
                        }}
                        className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                    <svg className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                    </svg>
                    <span className="flex-auto pl-16 pr-8 -ml-16">Continue with Google</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <button 
                      onClick={(e) => {
                          e.preventDefault();
                          signIn('linkedin');
                        }}
                        className="btn px-0 text-white bg-blue-900 hover:bg-blue-800 w-full relative flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4"/>
                    </svg>
                    <span className="flex-auto pl-16 pr-8 -ml-16">Continue with LinkedIn</span>
                  </button>
                </div>
              </div>
            </form>

            <div className="flex items-center my-6">
              <div className="border-t border-gray-300 grow mr-3" aria-hidden="true"></div>
              <div className="text-gray-600 italic">Or</div>
              <div className="border-t border-gray-300 grow ml-3" aria-hidden="true"></div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  {/* <Input isRequired onChange={(e) => setEmail(e.target.value)} type="email" label="Email" placeholder="Enter your email" /> */}
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <input id="email" onChange={(e) => setEmail(e.target.value)} type="email" className="form-input w-full text-gray-800" placeholder="Enter your email address" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <Link href="/reset-password" className="text-sm font-medium text-blue-600 hover:underline">Having trouble signing in?</Link>
                  </div>
                  <input id="password" onChange={(e) => setPassword(e.target.value)} type="password" className="form-input w-full text-gray-800" placeholder="Enter your password" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-gray-600 ml-2">Keep me signed in</span>
                    </label>
                  </div>
                </div>
              </div>

              {loginError && 
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-sm text-red-700 mt-2">
                    {loginError}
                </motion.div>
              }

              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  {loading ? ( 
                    <Button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" isLoading>
                      Logging in...
                    </Button>) : (
                      <Button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" type="submit">
                        Log In
                      </Button>
                    )}
                </div>
              </div>
            </form>
            
            <div className="text-gray-600 text-center mt-6">
              Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign up</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
"use client";
import React, { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import { Button } from './ui/button'
import { FaArrowRight } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Popover } from "flowbite-react";


export default function Navbar() {
  const pathName = usePathname();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/auth/me', {
          credentials: 'include', // Send HTTP-only cookies automatically
        });
        const data = await res.json();
        setUserData(data.data);
        setIsAuthenticated(res.ok);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathName]);

  // Hide navbar only on login/register pages
  if(pathName === '/login' || 
     pathName === '/login/businessregister' || 
     pathName === '/login/customerregister' || 
     pathName === '/login/forgot-password') {
    return null;
  }

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        setIsAuthenticated(false);
        router.push('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <div className="flex justify-between min-h-20 items-center px-6">

        <Link href="/" >
          <h1 className='text-[#359487] dark:text-[#C6FE02] font-bold text-xl md:text-2xl'>
            QuickQueue
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex justify-between items-center gap-3">
            <ul className='flex me-10 text-[17px] cursor-pointer'>
              <Link href="/"><li className='hover:text-[#359487] dark:hover:text-[#C6FE02]'>Home</li></Link>
              <Link href="/about"><li className='mx-5 hover:text-[#359487] dark:hover:text-[#C6FE02]'>About</li></Link>
              <Link href="/contact"><li className='hover:text-[#359487] dark:hover:text-[#C6FE02]'>Contact</li></Link>
            </ul>

            {!loading && (
              isAuthenticated ? (
                <div className='flex items-center gap-2'>
                  <Button onClick={handleLogout} className="my-5 bg-[#359487] hover:bg-black dark:bg-[#C6FE02] dark:hover:bg-[#C6FE02]">
                    Logout <BiLogOut />
                  </Button>
                  <Popover
                    aria-labelledby="profile-popover"
                    content={
                      <div className="w-48 p-3" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-4 flex items-center gap-3">
                          <p id="profile-popover" className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                            {userData?.name}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Link 
                            href="/business" 
                            className="block w-full px-3 py-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:bg-[#359487] hover:text-white dark:hover:bg-[#C6FE02] dark:hover:text-gray-900 transition-colors duration-200"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            Dashboard
                          </Link>
                        </div>
                      </div>
                    }
                  >
                    <button className="cursor-pointer w-10 h-10 rounded-full overflow-hidden bg-gray-600 text-white flex items-center justify-center text-[18px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#359487]">
                      {userData?.image ? (
                        <img 
                          src={userData?.image} 
                          alt={userData?.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        userData?.name?.charAt(0)
                      )}
                    </button>
                  </Popover>
                  {/* <p>{userData?.name || ''}</p> */}
                </div>
              ) : (
                <Link href="/login" >
                  <Button className="my-5 bg-[#359487] dark:bg-white">
                    Login <FaArrowRight />
                  </Button>
                </Link>
              )
            )}
          </div>

          <ThemeToggle />

          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-base hover:bg-neutral-tertiary hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary md:hidden"
          >
            <span className="sr-only">Open main menu</span>

            {isOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {isOpen && (
        <div className="md:hidden w-full">
          <ul className="flex flex-col font-medium mt-4 pt-4 bg-neutral-secondary-soft space-y-2 border-t border-default px-4 pb-4">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <li className='py-2 text-heading hover:text-[#359487] dark:hover:text-[#C6FE02]'>Home</li>
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              <li className='py-2 text-heading hover:text-[#359487] dark:hover:text-[#C6FE02]'>About</li>
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <li className='py-2 text-heading hover:text-[#359487] dark:hover:text-[#C6FE02]'>Contact</li>
            </Link>

            {!loading && (
              isAuthenticated ? (
                <Button onClick={() => { handleLogout(); setIsOpen(false); }} className="my-3 w-full bg-red-500 hover:bg-red-600 flex justify-center">
                  Logout <BiLogOut />
                </Button>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button className="my-3 w-full bg-[#359487] dark:bg-white flex justify-center">
                    Login <FaArrowRight />
                  </Button>
                </Link>
              )
            )}
          </ul>
        </div>
      )}
    </>
  )
}

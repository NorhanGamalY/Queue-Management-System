"use client";
import React, { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { Button } from './ui/button'
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

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

            <Link href="/login" >
              <Button className="my-5 bg-[#359487] dark:bg-white">
                Login <FaArrowRight />
              </Button>
            </Link>
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

            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button className="my-3 w-full bg-[#359487] dark:bg-white flex justify-center">
                Add Your Business <FaArrowRight />
              </Button>
            </Link>
          </ul>
        </div>
      )}
    </>
  )
}

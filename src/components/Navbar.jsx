import React from 'react'
import ThemeToggle from './ThemeToggle'
import { Button } from './ui/button'
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';

export default function Navbar() {
  return (
    <>
    <div className="flex justify-between min-h-20 items-center px-0 md:px-6">
    <Link href="/" > <h1 className='text-[#359487] dark:text-[#C6FE02] font-bold text-xl md:text-2xl'>QuickQueue</h1></Link> 
      <div className="flex justify-between items-center gap-3">
      <Link href="/register" > <Button className="my-5 bg-[#359487] dark:bg-white">   Add Your Business <FaArrowRight />  </Button></Link>
      <ThemeToggle/>

      </div>
      </div>
    </>
  )
}

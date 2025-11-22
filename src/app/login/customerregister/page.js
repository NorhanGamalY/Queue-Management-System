import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";

import Link from 'next/link';

export default function page() {
  return (
    <>
        <div className="min-h-screen bg-[white] text-black dark:bg-[#221F1B] dark:text-white transition-all duration-300 ">
    
    <div className="w-full flex justify-center items-center md:w-[80%] mx-auto p-5">
<div className="w-full flex flex-wrap justify-evenly items-center p-5 bg-[#F3F3F3] shadow-lg dark:bg-black">

    <div className="w-full md:w-1/2 px-5 py-5 text-center">
    <img src="/business.png" className="w-full" alt="Business Register"/>
    </div>
    
    <div>
<div className='pb-4 w-full'>

  <div className='text-center md:text-left'>
  <p className='text-2xl font-bold py-3'>Create Account</p>
  <span className='py-3'>Sign up to book appointments.</span>
  </div>

            <div className="grid gap-3">
               <Label className="my-2" htmlFor="Customer-Name"><IoPersonOutline />
            
                            Full Name
                            </Label>
                            <Input className="bg-[#ECECF0]" id="Customer-Name" defaultValue="Enter Your Name" />
                          </div>
            
                        <div className="grid gap-3">
                            <Label className="my-2" htmlFor="Customer-email"><MdOutlineMailLock />
                            Email
                            </Label>
                            <Input className="bg-[#ECECF0]" id="Customer-email" defaultValue="email@example.com" />
                          </div>
                           <div className="grid gap-3">
                            <Label className="my-2" htmlFor="Customer-Phone"><FaPhone />
                            Phone Number
                            </Label>
                            <Input className="bg-[#ECECF0]" id="Customer-Phone" defaultValue="01234567890" />
                          </div>
                          <div className="grid gap-3">
                            <Label  className="my-2" htmlFor="Customer-password"><RiLockPasswordLine />
                            Password
                            </Label>
                            <Input  className="bg-[#ECECF0]" id="Customer-password" defaultValue="Create a Password" />
              <Button>Login to Dashboard</Button> 
                <div className='text-center'><span>Already have an account? <Link className='font-bold' href="./">Sign in </Link> </span></div>
                

            </div>
</div>
</div>

  </div>
    </div>
    
   
    </div>  
    </>
  )
}

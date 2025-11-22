import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdOutlineAddBusiness } from "react-icons/md";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Link from 'next/link';



export default function page() {
  return (
    <>
    <div className="min-h-screen bg-[white] text-black dark:bg-[#221F1B] dark:text-white transition-all duration-300 ">
    
    <div className="w-full flex justify-center items-center md:w-[80%] mx-auto p-5">
<div className="w-full flex flex-wrap justify-evenly items-center p-5 bg-[#F3F3F3] shadow-lg dark:bg-black">

    <div className="w-full md:w-1/2 px-5 py-5 text-center">
    <img src="./register.png" class="img-responsive" alt="Image"/>
    </div>
    
    <div>
<div className='pb-4 w-full'>

  <div className='text-center md:text-left'>
  <p className='text-2xl font-bold py-3'>Welcome Back</p>
  <span className='py-3'>Log in to access your dashboard.</span>
  </div>
</div>
      <Tabs defaultValue="account" className="w-[400px]">
  <TabsList className="bg-[#ECECF0] dark:bg-[#171717]">

    <TabsTrigger className="w-[300px]" value="account">
      <IoPersonCircleSharp /> 
      Customer
      </TabsTrigger>

    <TabsTrigger value="password">
      <MdOutlineAddBusiness />
      Business
      </TabsTrigger>
  </TabsList>
  <TabsContent value="account">
  <div>
  <div className="grid gap-3">
                <Label className="my-2" htmlFor="Customer-email"><MdOutlineMailLock />
                Email
                </Label>
                <Input className="bg-[#ECECF0]" id="Customer-email" defaultValue="email@example.com" />
              </div>
              <div className="grid gap-3">
                <Label  className="my-2" htmlFor="Customer-password"><RiLockPasswordLine />
                Password
                </Label>
                <Input  className="bg-[#ECECF0]" id="Customer-password" defaultValue="password" />
                <Button>Login</Button>
                <div className='text-center'><span>Don't have an account? <Link className='font-bold' href="./login/customerregister">Sign Up </Link> </span></div>
                

  </div>
  </div>

  </TabsContent>
  <TabsContent value="password">
  <div className="grid gap-3">
                <Label className="my-2" htmlFor="Customer-email"><MdOutlineMailLock />
                Business Email
                </Label>
                <Input className="bg-[#ECECF0]" id="Customer-email" defaultValue="business@example.com" />
              </div>
              <div className="grid gap-3">
                <Label  className="my-2" htmlFor="Customer-password"><RiLockPasswordLine />
                Password
                </Label>
                <Input  className="bg-[#ECECF0]" id="Customer-password" defaultValue="password" />
               <Button>Login to Dashboard</Button> 
                <div className='text-center'><span>Don't have an account? <Link className='font-bold' href="./login/businessregister">Sign Up </Link> </span></div>
                

              </div>
  </TabsContent>
  
</Tabs>

    </div>
    </div>
    </div>
    </div>
    </>
  )
}

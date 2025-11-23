import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdOutlineAddBusiness, MdOutlineMailLock } from "react-icons/md";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { RiLockPasswordLine } from "react-icons/ri";
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <>
      <div className="min-h-[90.2vh] bg-white text-black dark:bg-[#221F1B] dark:text-white transition-all duration-300 flex items-center justify-center p-4 md:p-10">
        
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F3F3F3] dark:bg-black shadow-lg rounded-2xl p-4 md:p-8">
          
          <div className="flex justify-center items-center">
            <Image
              src="/register7.png"
              width={500}
              height={500}
              className="w-3/4 md:w-full object-contain"
              alt="Image"
            />
          </div>

          <div className="md:ps-10 text-center md:text-left">
            
            <p className="text-2xl font-bold py-3">Welcome Back</p>
            <span className="block mb-6">Log in to access your dashboard.</span>

            <Tabs defaultValue="account" className="w-full">
              
              <TabsList className="bg-[#ECECF0] dark:bg-[#171717] mb-4 flex w-full">
                <TabsTrigger className="w-1/2" value="account">
                  <IoPersonCircleSharp />
                  Customer
                </TabsTrigger>

                <TabsTrigger className="w-1/2" value="business">
                  <MdOutlineAddBusiness />
                  Business
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <div className="grid gap-4">
                  <Label htmlFor="Customer-email">
                    <MdOutlineMailLock />
                    Email
                  </Label>
                  <Input className="bg-[#ECECF0]" id="Customer-email" placeholder="email@example.com" />

                  <Label htmlFor="Customer-password">
                    <RiLockPasswordLine />
                    Password
                  </Label>
                  <Input className="bg-[#ECECF0]" id="Customer-password" placeholder="password" />

                  <Button className="w-full mt-2">Login</Button>

                  <div className="text-center mt-2">
                    <span>Don't have an account? <Link className='font-bold' href="./login/customerregister">Sign Up </Link></span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="business">
                <div className="grid gap-4">
                  <Label htmlFor="Business-email">
                    <MdOutlineMailLock />
                    Business Email
                  </Label>
                  <Input className="bg-[#ECECF0]" id="Business-email" placeholder="business@example.com" />

                  <Label htmlFor="Business-password">
                    <RiLockPasswordLine />
                    Password
                  </Label>
                  <Input className="bg-[#ECECF0]" id="Business-password" placeholder="password" />

                  <Button className="w-full mt-2">Login to Dashboard</Button>

                  <div className="text-center mt-2">
                    <span>Don't have an account? <Link className='font-bold' href="./login/businessregister">Sign Up </Link></span>
                  </div>
                </div>
              </TabsContent>

            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}
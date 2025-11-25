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
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 dark:bg-[#221F1B]">
      
      <div className="relative w-full h-full bg-[#287b70] py-15 md:py-0 dark:bg-black">
        <Image
          src="/register7.png"
          fill
          className="object-contain w-full h-full"
          alt="Login visual"
        />
      </div>

      <div className="flex flex-col justify-center px-10 bg-white xl:w-2/3 w-full items-center mx-auto dark:bg-[#221F1B]">

        <h2 className="text-3xl font-bold mb-2 text-[#29b7a4]">Login Account</h2>
        <p className="mb-8 text-gray-500 text-center dark:text-white">
          Log in to access your dashboard and manage your account.
        </p>

        <Tabs defaultValue="account" className="w-full">

          <TabsList className="bg-[#ECECF0] mb-6 flex w-full dark:bg-[#37332f] dark:text-white">
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
              <Label>Email</Label>
              <Input className="bg-[#ECECF0]" placeholder="email@example.com" />

              <Label>Password</Label>
              <Input className="bg-[#ECECF0]" placeholder="password" />

              <Button className="w-full mt-2">Login</Button>

              <p className="text-center mt-2">
                Don't have an account? <Link className='font-bold' href="./login/customerregister">Sign Up</Link>
              </p>
            </div>
          </TabsContent>

          <TabsContent value="business">
            <div className="grid gap-4">
              <Label>Business Email</Label>
              <Input className="bg-[#ECECF0]" placeholder="business@example.com" />

              <Label>Password</Label>
              <Input className="bg-[#ECECF0]" placeholder="password" />

              <Button className="w-full mt-2">Login to Dashboard</Button>

              <p className="text-center mt-2">
                Don't have an account? <Link className='font-bold' href="./login/businessregister">Sign Up</Link>
              </p>
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { MdOutlineMailLock } from "react-icons/md"
import { RiLockPasswordLine } from "react-icons/ri"
import { IoPersonOutline } from "react-icons/io5"
import { FaPhone } from "react-icons/fa6"
import Link from 'next/link'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      <div className="min-h-[90.2vh] bg-white text-black dark:bg-[#221F1B] dark:text-white transition-all duration-300 flex items-center justify-center p-4 md:p-10">
        
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F3F3F3] dark:bg-black shadow-lg rounded-2xl p-4 md:p-8 border border-gray-200">
          
          <div className="flex justify-center items-center">
            <Image
              src="/register6.png"
              width={500}
              height={500}
              className="w-3/4 md:w-full object-contain"
              alt="Business Register"
            />
          </div>

          <div className="w-full md:ps-10 text-center md:text-left">
            
            <p className="text-2xl font-bold py-3">Create Account</p>
            <span className="block mb-4">Sign up to book appointments.</span>

            <div className="grid gap-3 my-4">
              <Label htmlFor="Customer-Name">
                <IoPersonOutline />
                Full Name
              </Label>
              <Input
                className="bg-[#ECECF0]"
                id="Customer-Name"
                placeholder="Enter Your Name"
              />
            </div>

            <div className="grid gap-3 my-4">
              <Label htmlFor="Customer-email">
                <MdOutlineMailLock />
                Business Email
              </Label>
              <Input
                className="bg-[#ECECF0]"
                id="Customer-email"
                placeholder="email@example.com"
              />
            </div>

            <div className="grid gap-3 my-4">
              <Label htmlFor="Customer-Phone">
                <FaPhone />
                Phone Number
              </Label>
              <Input
                className="bg-[#ECECF0]"
                id="Customer-Phone"
                placeholder="01234567890"
              />
            </div>

            <div className="grid gap-3 my-4">
              <Label htmlFor="Customer-password">
                <RiLockPasswordLine />
                Password
              </Label>
              <Input
                className="bg-[#ECECF0]"
                id="Customer-password"
                placeholder="Create a Password"
              />
            </div>

            <Button className="w-full my-3">
              Create Account
            </Button>

            <div className="text-center mb-2">
              <span>
                Already have an account?
                <Link className='font-bold' href="./">
                  {" "}Sign in
                </Link>
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
"use client";
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { MdOutlineMailLock } from "react-icons/md"
import { RiLockPasswordLine } from "react-icons/ri"
import { IoPersonOutline } from "react-icons/io5"
import { FaPhone } from "react-icons/fa6"
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const API = 'http://localhost:5000/api/v1/auth/register/user';
  const [user, setUser] = useState({name: '', email: '', password: '', phone: ''})
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const handleRegister = async () => {
    setError('');
    try {
      const res = await fetch(API, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
      })
      
      const data = await res.json();
      
      if(!res.ok){
        throw new Error(data.message || "Failed to register user");
      }
      
      console.log("User Registered:", data);
      router.push('/user');
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
    }
  }

  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-[#221F1B]">

      <div className="relative w-full h-full bg-[#287b70] py-15 md:py-0 dark:bg-black md:flex justify-center hidden md:block">
        <Image
          width={500}
          height={500}
          src="/register8.png"
          className="object-contain w-9/12"
          alt="Business Register"
        />
      </div>

      <div className="flex flex-col justify-center px-10 py-12 text-center md:text-left bg-white xl:w-2/3 w-full mx-auto dark:bg-[#221F1B]">

        <p className="text-3xl font-bold mb-2 text-[#29b7a4] text-center">Create Account</p>
        <span className="block mb-8 text-gray-500 text-center">Sign up to book appointments.</span>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-full text-center">
            {error}
          </div>
        )}

        <div className="grid gap-4 mb-4">
          <Label htmlFor="Customer-Name">
            <IoPersonOutline />
            Full Name
          </Label>
          <Input
            onChange={handleChange}
            value={user.name}
            name="name"
            className="bg-[#ECECF0]"
            id="Customer-Name"
            placeholder="Enter Your Name"
          />
        </div>

        <div className="grid gap-4 mb-4">
          <Label htmlFor="Customer-email">
            <MdOutlineMailLock />
            Email
          </Label>
          <Input
            type="email"
            onChange={handleChange}
            value={user.email}
            name="email"
            className="bg-[#ECECF0]"
            id="Customer-email"
            placeholder="email@example.com"
          />
        </div>

        <div className="grid gap-4 mb-4">
          <Label htmlFor="Customer-Phone">
            <FaPhone />
            Phone Number (Optional)
          </Label>
          <Input
            type="number"
            onChange={handleChange}
            value={user.phone}
            name="phone"
            className="bg-[#ECECF0]"
            id="Customer-Phone"
            placeholder="01234567890"
          />
        </div>

        <div className="grid gap-4 mb-4">
          <Label htmlFor="Customer-password">
            <RiLockPasswordLine />
            Password
          </Label>
          <Input
            type="password"
            onChange={handleChange}
            value={user.password}
            name="password"
            className="bg-[#ECECF0]"
            id="Customer-password"
            placeholder="Create a Password"
          />
        </div>

        <Button className="w-full my-3" onClick={handleRegister}>
          Create Account
        </Button>

        <div className="text-center">
          <span>
            Already have an account?
            <Link className='font-bold' href="./">
              {" "}Sign in
            </Link>
          </span>
        </div>

      </div>
    </div>
  )
}

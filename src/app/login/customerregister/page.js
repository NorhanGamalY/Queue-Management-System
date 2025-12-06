"use client";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from '@/hooks/useTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaPhone } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export default function Page() {
  const router = useRouter();
  const { t } = useTranslations();
  const API = 'http://localhost:5000/api/v1/auth/register';
  const [user, setUser] = useState({name: '', email: '', password: '', phone: ''});
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:5000/api/v1/auth/google';
  }

  const handleRegister = async () => {
    setError('');
    console.log(user);
    try {
      const res = await fetch(API, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
      })
      
      const data = await res.json();
      console.log("User Registered:", data);
      
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

        <p className="text-3xl font-bold mb-2 text-[#29b7a4] text-center">{t('register.customer.title')}</p>
        <span className="block mb-8 text-gray-500 text-center">{t('register.customer.subtitle')}</span>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-full text-center">
            {error}
          </div>
        )}

        <div className="grid gap-4 mb-4">
          <Label htmlFor="Customer-Name">
            <IoPersonOutline />
            {t('register.customer.fullName')}
          </Label>
          <Input
            onChange={handleChange}
            value={user.name}
            name="name"
            className="bg-[#ECECF0]"
            id="Customer-Name"
            placeholder={t('register.customer.namePlaceholder')}
          />
        </div>

        <div className="grid gap-4 mb-4">
          <Label htmlFor="Customer-email">
            <MdOutlineMailLock />
            {t('register.customer.email')}
          </Label>
          <Input
            type="email"
            onChange={handleChange}
            value={user.email}
            name="email"
            className="bg-[#ECECF0]"
            id="Customer-email"
            placeholder={t('register.customer.emailPlaceholder')}
          />
        </div>

        <div className="grid gap-4 mb-4">
          <Label htmlFor="Customer-Phone">
            <FaPhone />
            {t('register.customer.phone')}
          </Label>
          <Input
            type="tel"
            onChange={handleChange}
            value={user.phone || ''}
            name="phone"
            className="bg-[#ECECF0]"
            id="Customer-Phone"
            placeholder={t('register.customer.phonePlaceholder')}
          />
        </div>

        <div className="grid gap-4 mb-4">
          <Label htmlFor="Customer-password">
            <RiLockPasswordLine />
            {t('register.customer.password')}
          </Label>
          <Input
            type="password"
            onChange={handleChange}
            value={user.password}
            name="password"
            className="bg-[#ECECF0]"
            id="Customer-password"
            placeholder={t('register.customer.passwordPlaceholder')}
          />
        </div>

        <Button className="w-full my-3" onClick={handleRegister}>
          {t('register.customer.createAccount')}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-[#221F1B] text-gray-500 dark:text-gray-400">{t('register.customer.orContinueWith')}</span>
          </div>
        </div>

        <Button 
          type="button"
          onClick={handleGoogleSignup}
          className="w-full bg-white dark:bg-[#37332f] text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2b2825] flex items-center justify-center gap-3 mb-4"
        >
          <FcGoogle size={20} />
          {t('register.customer.signUpWithGoogle')}
        </Button>

        <div className="text-center">
          <span>
            {t('register.customer.alreadyHaveAccount')}
            <Link className='font-bold' href="./">
              {" "}{t('register.customer.signIn')}
            </Link>
          </span>
        </div>

      </div>
    </div>
  )
}

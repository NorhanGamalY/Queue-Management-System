"use client";
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IoPersonCircleSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineAddBusiness, MdOutlineMailLock } from "react-icons/md";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { RiLockPasswordLine } from "react-icons/ri";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const API = 'http://localhost:5000/api/v1/auth/login';
  
  const [customerData, setCustomerData] = useState({ email: '', password: '' });
  const [businessData, setBusinessData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/v1/auth/google';
  };

  const handleCustomerChange = (e) => {
    setCustomerData({...customerData, [e.target.name]: e.target.value});
  };

  const handleBusinessChange = (e) => {
    setBusinessData({...businessData, [e.target.name]: e.target.value});
  };

  const handleCustomerLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(API, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(customerData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to login");
      }

      console.log('Logged in:', data);
      
      // Redirect based on role
      if (data.user && data.user.role === 'business') {
        router.push('/business');
      } else {
        router.push('/user');
      }
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(API, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(businessData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to login");
      }

      console.log('Logged in:', data);
      
      // Redirect based on role
      if (data.user && data.user.role === 'business') {
        router.push('/business');
      } else {
        router.push('/user');
      }
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 dark:bg-[#221F1B]">
      
      <div className="relative hidden md:block md:w-full md:h-full bg-[#287b70] py-15 md:py-0 dark:bg-black">
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

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-full">
            {error}
          </div>
        )}

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
            <form onSubmit={handleCustomerLogin} className="grid gap-4">
              <div className="grid gap-4 mb-4">
                <Label htmlFor="customer-email">
                  <MdOutlineMailLock />
                  Email
                </Label>
                <Input
                  type="email"
                  onChange={handleCustomerChange}
                  value={customerData.email}
                  name="email"
                  className="bg-[#ECECF0]"
                  id="customer-email"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="grid gap-4 mb-4">
                <Label htmlFor="customer-password">
                  <RiLockPasswordLine />
                  Password
                </Label>
                <Input
                  type="password"
                  onChange={handleCustomerChange}
                  value={customerData.password}
                  name="password"
                  className="bg-[#ECECF0]"
                  id="customer-password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="text-right mb-2">
                <Link href="/login/forgot-password" className="text-sm text-gray-700 hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-[#221F1B] text-gray-500 dark:text-gray-400">Or continue with</span>
                </div>
              </div>

              <Button 
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white dark:bg-[#37332f] text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2b2825] flex items-center justify-center gap-3"
              >
                <FcGoogle size={20} />
                Sign in with Google
              </Button>

              <p className="text-center mt-4">
                Don't have an account? <Link className='font-bold' href="./login/customerregister">Sign Up</Link>
              </p>
            </form>
          </TabsContent>

          <TabsContent value="business">
            <form onSubmit={handleBusinessLogin} className="grid gap-4">
              <div className="grid gap-4 mb-4">
                <Label htmlFor="business-email">
                  <MdOutlineMailLock />
                  Business Email
                </Label>
                <Input
                  type="email"
                  onChange={handleBusinessChange}
                  value={businessData.email}
                  name="email"
                  className="bg-[#ECECF0]"
                  id="business-email"
                  placeholder="business@example.com"
                  required
                />
              </div>

              <div className="grid gap-4 mb-4">
                <Label htmlFor="business-password">
                  <RiLockPasswordLine />
                  Password
                </Label>
                <Input
                  type="password"
                  onChange={handleBusinessChange}
                  value={businessData.password}
                  name="password"
                  className="bg-[#ECECF0]"
                  id="business-password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="text-right mb-2">
                <Link href="/login/forgot-password" className="text-sm text-[#29b7a4] hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? 'Logging in...' : 'Login to Dashboard'}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-[#221F1B] text-gray-500 dark:text-gray-400">Or continue with</span>
                </div>
              </div>

              <Button 
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white dark:bg-[#37332f] text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2b2825] flex items-center justify-center gap-3"
              >
                <FcGoogle size={20} />
                Sign in with Google
              </Button>

              <p className="text-center mt-4">
                Don't have an account? <Link className='font-bold' href="./login/businessregister">Sign Up</Link>
              </p>
            </form>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}

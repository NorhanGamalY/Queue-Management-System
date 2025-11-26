import React from 'react'
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FiAward } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { MdOutlineTrendingUp } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { BsLightning } from "react-icons/bs";
import { SiFsecure } from "react-icons/si";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


export default function page() {
return (
    <>
        <div className="bg-[#F3F3F3] dark:bg-gradient-to-b dark:from-[#181715] dark:to-[#1F1D1A]">
            <div className="w-[90%] md:w-[70%] mx-auto text-center pt-10 mb-10"> 
        <h1 className="md:text-6xl text-5xl py-5 dark:text-[#C6FE02] dark:drop-shadow-[0_0_10px_rgba(198,254,2,0.5)]">About QuickQueue</h1>
        <p className="md:text-[20px] text-[17px] text-gray-600 px-6 py-5 md:px-0 dark:text-gray-300">
            We're transforming how businesses manage customer flow and enhance service experiences. Our mission is to eliminate wait-time frustrations and maximize operational efficiency, providing a smoother, more satisfying experience for both customers and businesses.
        </p>
        </div>

        <div className="w-[80%] mx-auto flex flex-wrap justify-evenly items-center gap-2 pt-5 my-5">
        <div className='w-[48%] md:w-1/5 py-3 border flex flex-col justify-evenly items-center  border-gray-600 dark:border-gray-300 rounded-md'>
            <MdOutlinePeopleAlt className='text-[#359487] dark:text-[#C6FE02] text-[36px]' />
            <p className='text-[30px]'> 500+</p>
            <p className='text-gray-600 dark:text-gray-300'>Registered Businesses</p>
        </div>

        <div className='w-[48%] md:w-1/5 py-3 border flex flex-col justify-evenly items-center  border-gray-600 dark:border-gray-300 rounded-md'>
            <FiAward className='text-[#359487] dark:text-[#C6FE02] text-[36px]' />
            <p className='text-[36px]'>100K+</p>
            <p className='text-gray-600 dark:text-gray-300'>Happy Customers</p>
        </div>

        <div className='w-[48%] md:w-1/5 py-3 border flex flex-col justify-evenly items-center  border-gray-600 dark:border-gray-300 rounded-md'>
            <IoMdTime className='text-[#359487] dark:text-[#C6FE02] text-[36px]' />
            <p className='text-[30px]'>60%</p>
            <p className='text-gray-600 dark:text-gray-300'>Reduced Wait Time</p>
        </div>

        <div className='w-[48%] md:w-1/5 py-3 border flex flex-col justify-evenly items-center  border-gray-600 dark:border-gray-300 rounded-md'>
            <MdOutlineTrendingUp className='text-[#359487] dark:text-[#C6FE02] text-[36px]' />
            <p className='text-[30px]'>99.9%</p>
            <p className='text-gray-600 dark:text-gray-300'>System Uptime</p>
        </div>
        </div>

        <div className="w-[80%] mx-auto flex flex-wrap justify-evenly items-center gap-2 pt-5 my-10">
        <div className='w-[98%] md:w-[45%] py-3 border flex flex-col justify-evenly items-start px-4  border-gray-600 dark:border-gray-300 rounded-md md:min-h-[410px] lg:min-h-[300px]'>
            <h4 className='text-[30px]'>Our Mission</h4>
            <p className='text-gray-600 dark:text-gray-300'>To elevate the customer service experience through intelligent, user-friendly queue management solutions that save time, reduce stress, and enhance satisfaction for both businesses and their customers.

We believe no one should have to waste valuable time standing in line. By leveraging technology and innovation, we’re transforming traditional queues into smarter, more efficient, and more accessible service experiences</p>
        </div>

        <div className='w-[98%] md:w-[45%] py-3 border flex flex-col justify-evenly items-start px-4  border-gray-600 dark:border-gray-300 rounded-md md:min-h-[410px] lg:min-h-[300px]'>
            <h4 className='text-[36px]'>Our Mission</h4>
            <p className='text-gray-600 dark:text-gray-300'>To become the region's leading queue management platform, empowering businesses of all sizes—from small clinics to large enterprises—with the tools they need to deliver exceptional customer experiences.

We envision a future where waiting in line is obsolete, replaced by seamless, digital-first service experiences that prioritize convenience and efficiency.</p>
        </div>
        </div>

        <div className="w-[80%] mx-auto flex flex-wrap justify-evenly items-center my-10">
            <h5 className='text-[36px]'>Why Choose Us</h5>
        </div>

        <div className="w-[80%] mx-auto flex flex-wrap justify-evenly items-center gap-2 pt-5 my-5">
        <div className='w-[98%] md:w-[30%] py-3 border flex flex-col justify-evenly items-start px-5  border-gray-600 dark:border-gray-300 rounded-md'>
            <BsLightning className='text-[#359487] dark:text-[#C6FE02] text-[36px] my-4' />
            <p className='text-[24px]'>Real-Time Updates</p>
            <p className='text-gray-600 dark:text-gray-300'>Registered Businesses</p>
        </div>

        <div className='w-[98%] md:w-[30%] py-3 border flex flex-col justify-evenly items-start px-5  border-gray-600 dark:border-gray-300 rounded-md'>
            <SiFsecure className='text-[#359487] dark:text-[#C6FE02] text-[36px] my-4' />
            <p className='text-[24px]'>Secure & Reliable</p>
            <p className='text-gray-600 dark:text-gray-300'>Registered Businesses</p>
        </div>

        <div className='w-[98%] md:w-[30%] py-3 border flex flex-col justify-evenly items-start px-5  border-gray-600 dark:border-gray-300 rounded-md'>
            <TbWorld className='text-[#359487] dark:text-[#C6FE02] text-[36px] my-4' />
            <p className='text-[24px]'>Multi-Language Support</p>
            <p className='text-gray-600 dark:text-gray-300'>Registered Businesses</p>
        </div>

        <div className='w-[98%] md:w-[30%] py-3 border flex flex-col justify-evenly items-start px-5  border-gray-600 dark:border-gray-300 rounded-md'>
            <MdOutlinePeopleAlt className='text-[#359487] dark:text-[#C6FE02] text-[36px] my-4' />
            <p className='text-[24px]'>Easy Integration</p>
            <p className='text-gray-600 dark:text-gray-300'>Registered Businesses</p>
        </div>

        <div className='w-[98%] md:w-[30%] py-3 border flex flex-col justify-evenly items-start px-5  border-gray-600 dark:border-gray-300 rounded-md'>
            <IoMdTime className='text-[#359487] dark:text-[#C6FE02] text-[36px] my-4' />
            <p className='text-[24px]'>Smart Scheduling</p>
            <p className='text-gray-600 dark:text-gray-300'>Registered Businesses</p>
        </div>

        <div className='w-[98%] md:w-[30%] py-3 border flex flex-col justify-evenly items-start px-5  border-gray-600 dark:border-gray-300 rounded-md'>
            <MdOutlinePeopleAlt className='text-[#359487] dark:text-[#C6FE02] text-[36px] my-4' />
            <p className='text-[24px]'>Analytics Dashboard</p>
            <p className='text-gray-600 dark:text-gray-300'>Registered Businesses</p>
        </div>
        </div>

        <div className="w-[80%] mx-auto flex flex-wrap justify-evenly items-center my-10">
            <h5 className='text-[36px]'>Our Values</h5>
        </div> 

        <div className="w-[80%] mx-auto flex flex-wrap justify-evenly items-center gap-2 pt-5 pb-5">
        <div className='w-[48%] md:w-1/5 py-5 flex flex-col justify-evenly items-center'>
            <IoMdCheckmarkCircleOutline className='text-[white] dark:text-[black] text-[36px] mb-2 p-1 border rounded-full border-[#359487] dark:border-[#C6FE02] bg-[#359487] dark:bg-[#C6FE02]' />
            <p className='text-[30px]'>Innovation</p>
            <p className='text-gray-600 dark:text-gray-300'>Always pushing boundaries</p>
        </div>

        <div className='w-[48%] md:w-1/5 py-3 flex flex-col justify-evenly items-center'>
            <IoMdCheckmarkCircleOutline className='text-[white] dark:text-[black] text-[36px] mb-2 p-1 border rounded-full border-[#359487] dark:border-[#C6FE02] bg-[#359487] dark:bg-[#C6FE02]' />
            <p className='text-[30px]'>Customer First</p>
            <p className='text-gray-600 dark:text-gray-300'>Your success is our success</p>
        </div>

        <div className='w-[48%] md:w-1/5 py-3 flex flex-col justify-evenly items-center'>
            <IoMdCheckmarkCircleOutline className='text-[white] dark:text-[black] text-[36px] mb-2 p-1 border rounded-full border-[#359487] dark:border-[#C6FE02] bg-[#359487] dark:bg-[#C6FE02]' />
            <p className='text-[30px]'>Reliability</p>
            <p className='text-gray-600 dark:text-gray-300'>Consistent, dependable service</p>
        </div>

        <div className='w-[48%] md:w-1/5 py-3 flex flex-col justify-evenly items-center'>
            <IoMdCheckmarkCircleOutline className='text-[white] dark:text-[black] text-[36px] mb-2 p-1 border rounded-full border-[#359487] dark:border-[#C6FE02] bg-[#359487] dark:bg-[#C6FE02]' />
            <p className='text-[30px]'>Transparency</p>
            <p className='text-gray-600 dark:text-gray-300'>Open and honest communication</p>
        </div>
        </div>

    </div>
    </>
)
}

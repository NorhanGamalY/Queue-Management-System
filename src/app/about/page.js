import React from 'react'
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FiAward } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { MdOutlineTrendingUp } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { BsLightning } from "react-icons/bs";
import { SiFsecure } from "react-icons/si";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { v4 as uuid } from 'uuid';
import AboutCard from '@/components/AboutCard';
import AboutCard2 from '@/components/AboutCard2';


export default function page() {
    const statics =[{icon: <MdOutlinePeopleAlt />, title:"Registered Businesses", value:"500+"}, {icon: <FiAward />, title:"Awards", value:"120+"}, {icon: <IoMdTime />, title:"Reduced Wait Time", value:"60%"}, {icon: <MdOutlineTrendingUp />, title:"System Uptime", value:"99.9%"}]
    const advantages = [{icon: <BsLightning />, title:"Real-Time Updates", description:"Stay informed with instant notifications and live queue status."}, {icon: <SiFsecure />, title:"Secure & Reliable", description:"Your data is protected with top-tier security measures."}, {icon: <TbWorld />, title:"Multi-Language Support", description:"Cater to a diverse clientele with our multi-language interface."}, {icon: <MdOutlinePeopleAlt />, title:"Easy Integration", description:"Seamlessly integrate with your existing systems and workflows."}, {icon: <IoMdTime />, title:"Smart Scheduling", description:"Optimize appointment bookings with intelligent scheduling features."}, {icon: <MdOutlinePeopleAlt />, title:"Analytics Dashboard", description:"Gain insights with comprehensive analytics and reporting tools."}]  
    const values =[{title:"Innovation",description:"Always pushing boundaries"}, {title:"Customer First", description:"Your success is our success"}, {title:"Reliability", description:"Consistent, dependable service"}, {title:"Transparency", description:"Open and honest communication" } ]
   
    return (
    <>
        <div className="bg-[#F3F3F3] dark:bg-gradient-to-b dark:from-[#181715] dark:to-[#1F1D1A]">
            <div className="w-[90%] md:w-[70%] mx-auto text-center pt-10 mb-10"> 
        <h1 className="text-[#359487] font-semibold md:text-6xl text-5xl py-5 dark:text-[#C6FE02] dark:drop-shadow-[0_0_10px_rgba(198,254,2,0.5)]">About QuickQueue</h1>
        <p className="md:text-[20px] text-[17px] text-gray-600 px-6 py-5 md:px-0 dark:text-gray-300">
            We're transforming how businesses manage customer flow and enhance service experiences. Our mission is to eliminate wait-time frustrations and maximize operational efficiency, providing a smoother, more satisfying experience for both customers and businesses.
        </p>
        </div>

        <div className="w-[80%] mx-auto flex flex-wrap justify-evenly items-center gap-2 pt-5 my-5">
        {statics.map((i) => (
        <AboutCard icon={i.icon} title={i.title} value={i.value} key={uuid()} fontSize="text-[36px]" showBorder={true}></AboutCard>
        ))}

        </div>

        <div className="w-[80%] mx-auto flex flex-wrap justify-evenly items-center gap-2 pt-5 my-10">
            <AboutCard2 h="md:min-h-[410px] lg:min-h-[300px]" w="w-[98%] md:w-[45%]" titleSize="text-[30px]" title={"Our Mission"} value={'We believe no one should have to waste valuable time standing in line. By leveraging technology and innovation, we’re transforming traditional queues into smarter, more efficient, and more accessible service experiences'}/>   
            <AboutCard2 h="md:min-h-[410px] lg:min-h-[300px]" w="w-[98%] md:w-[45%]" titleSize="text-[30px]" title={"Our Vision"} value={'We envision a future where waiting in line is obsolete, replaced by seamless, digital-first service experiences that prioritize convenience and efficiency.'}/>
        </div>

        <div className="w-[80%] mx-auto flex flex-wrap justify-evenly items-center my-10">
            <h5 className='text-[36px]'>Why Choose Us</h5>
        </div>
        <div className="w-[80%] mx-auto flex flex-wrap justify-evenly items-center gap-2 pt-5 my-5">
                {advantages.map((i) => (
                    <AboutCard2 icon={i.icon} title={i.title} value={i.description} key={uuid()} w='w-[98%] md:w-[30%]' titleSize="text-[24px]"></AboutCard2>
                ))}
        </div>

        <div className="w-[80%] mx-auto flex flex-wrap justify-evenly items-center my-8">
            <h5 className='text-[36px]'>Our Values</h5>
        </div> 
        <div className="w-[80%] mx-auto flex flex-wrap justify-evenly items-center gap-2 pt-5 pb-5">
        {values.map((i) => (
            <AboutCard icon={<IoMdCheckmarkCircleOutline className='text-[white] dark:text-[black] text-[36px] mb-2 p-1  border rounded-full border-[#359487] dark:border-[#C6FE02] bg-[#359487] dark:bg-[#C6FE02]'/>} value={i.title} title={i.description} key={uuid()} fontSize="text-[22px] md:text-[30px]" iconSize="" ></AboutCard>
        ))}
        
        </div>

    </div>
    </>
)
}

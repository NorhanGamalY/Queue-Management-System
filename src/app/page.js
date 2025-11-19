import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
    <div className="min-h-screen bg-[#F3F3F3] text-black dark:bg-[#221F1B] dark:text-white transition-all duration-300 ">
    
    <div className="container mx-auto pt-5">
<div className="flex flex-wrap justify-evenly items-center pt-5">
   <div className="w-full md:w-1/2 px-5 pt-5 text-center">
   <h1 className="text-3xl md:text-5xl font-bold dark:text-[#C6FE02]">
    Skip the Wait, Book Your Spot
   </h1>
   <h5 className="py-5 text-[#359487] text-2xl md:text-3xl font-semibold dark:text-white">
    Manage Queues Intelligently
   </h5>
   <p className="w-3/4">
    Find and book appointments at clinics, banks, telecom centers, and more. Manage your time efficiently with our smart queue system
   </p>
   <Button className="my-5 bg-[#359487] dark:bg-white">Book an Appointment</Button>
   </div>
    <div className="w-full md:w-1/3 px-5">
      
      <img src="./header.png" className="w-full max-w-full bg-[#F3F3F3] dark:bg-[#221F1B] hidden dark:block" alt="header"/>
      <img src="./bg.png" className="w-full max-w-full bg-[#F3F3F3] dark:bg-[#221F1B] dark:hidden" alt="header"/>

    </div>

  </div>  

    </div>
    
   
    </div>
    </>
  );
}

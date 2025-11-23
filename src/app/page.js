import CardLists from "@/components/CardLists";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-[#F3F3F3] text-black dark:bg-[#221F1B] dark:text-white transition-all duration-300 ">
        <div className="container mx-auto pt-5 h-full">
          <div className="flex flex-wrap justify-evenly items-center pt-5">
            <div className="w-full lg:w-1/2 px-5 pt-5 text-center">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold dark:text-[#C6FE02]">
                Skip the Wait, Book Your Spot
              </h1>
              <h5 className="py-5 text-[#359487] text-2xl lg:text-3xl xl:text-3xl font-semibold dark:text-white">
                Manage Queues Intelligently
              </h5>
              <div className="flex justify-center">
                <p className="w-3/4">
                  Find and book appointments at clinics, banks, telecom centers,
                  and more. Manage your time efficiently with our smart queue
                  system
                </p>
              </div>
              <Button className="my-5 bg-[#359487] dark:bg-white">
                Book an Appointment
              </Button>
            </div>
              <div className="w-full lg:w-1/3 px-5 flex justify-center">
              <Image
                width={472}
                height={472}
                src="/./header.png"
                className="w-3/4 lg:w-full bg-[#F3F3F3] dark:bg-[#221F1B] hidden dark:block"
                alt="header"
              />
              <Image
                width={472}
                height={472}
                src="/./bg.png"
                className="w-3/4 lg:w-full bg-[#F3F3F3] dark:bg-[#221F1B] dark:hidden"
                alt="header"
              />
            </div>
          </div>
          <div className="text-center mt-20">
            <h1 className="text-3xl pb-3">Available Services</h1>
            <p>Browse and book your spot at various locations</p>
          </div>
          <form className="mt-5 flex items-center max-w-sm mx-auto space-x-2">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0a4 4 0 0 1-4 4h-1a3 3 0 0 0-3 3" /></svg>
              </div>
              <input type="text" id="simple-search" className="rounded-xl px-3 py-2.5 bg-neutral-secondary-medium border border-gray-300 rounded-base ps-9 text-heading text-sm focus:ring-brand focus:border-brand block w-full placeholder:text-body" placeholder="Search branch name..." required />
            </div>
            <button type="submit" className="dark:bg-[#C6FE02] dark:text-black bg-[#359487] rounded-xl inline-flex items-center justify-center shrink-0 text-white bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs rounded-base w-10 h-10 focus:outline-none">
              <CiSearch size={20}/>
            </button>
          </form>
          <div className="mt-15">
            <CardLists/>
          </div>

        </div>
      </div>
    </>
  );
}

"use client";

import CardLists from "@/components/CardLists";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const url = searchQuery.trim() 
        ? `http://localhost:5000/api/v1/search?q=${encodeURIComponent(searchQuery)}`
        : `http://localhost:5000/api/v1/search`;
        
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('Search API returned non-JSON response');
        setSearchResults([]);
        return;
      }
      
      const data = await response.json();
      console.log('Search results:', data);
      setSearchResults(Array.isArray(data) ? data : data.results || []);
    } catch (error) {
      console.error("Error searching clinics:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="pb-20 min-h-screen bg-[#F3F3F3] text-black dark:bg-[#221F1B] dark:text-white transition-all duration-300">
        <div className="container w-full px-4 sm:px-6 lg:w-11/12 mx-auto">
          
          <div className="relative">
            <h1 className="pt-10 text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-center text-[#359487] font-bold dark:text-[#C6FE02] dark:drop-shadow-[0_0_10px_rgba(198,254,2,0.5)] drop-shadow-[0_0_10px_rgba(30,240,220,0.7)] big-scale">
              Skip the Wait, Book Your Spot
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center pt-5 lg:pt-10 gap-8 lg:gap-0">
              
              <div className="lg:col-span-1 px-4 sm:px-5 text-center flex flex-col justify-center order-2 lg:order-1">
                
                <div className="mb-6 lg:mb-8 hidden sm:block">
                  <div className="flex items-center justify-center gap-4 sm:gap-5 lg:gap-7">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 xl:w-10 xl:h-10 rounded-full bg-[#359487] dark:bg-[#b4f221] animate-pulse"></div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 xl:w-10 xl:h-10 rounded-full bg-[#359487] dark:bg-[#b4f221] animate-pulse" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 xl:w-10 xl:h-10 rounded-full bg-[#359487] dark:bg-[#b4f221] animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 xl:w-10 xl:h-10 rounded-full bg-[#359487] dark:bg-[#b4f221] animate-pulse" style={{animationDelay: '0.7s'}}></div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 xl:w-10 xl:h-10 rounded-full bg-[#359487] dark:bg-[#b4f221] animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>

                <h5 className="py-3 sm:py-4 lg:py-5 text-2xl sm:text-3xl font-semibold text-[#359487] dark:text-[white]">
                  Manage Queues Intelligently
                </h5>
                
                <div className="flex justify-center">
                  <p className="w-full sm:w-11/12 text-sm sm:text-base text-gray-600 dark:text-gray-300 px-2">
                    Find and book appointments at clinics, banks, telecom centers,
                    and more. Manage your time efficiently with our smart queue
                    system
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-5">
                  <button className="cursor-pointer w-full sm:w-auto bg-[#359487] px-6 py-2.5 rounded-md text-white font-medium hover:bg-[#2a8074] dark:bg-[#C6FE02] dark:text-black dark:hover:bg-[#9dc704] transition-colors">
                    Book an Appointment
                  </button>
                  <button className="cursor-pointer w-full sm:w-auto bg-transparent border-2 text-[#359487] border-[#359487] hover:bg-[#359487] hover:text-white dark:bg-transparent dark:border-[#C6FE02] dark:text-[#C6FE02] dark:hover:bg-[#C6FE02] dark:hover:text-[#221F1B] px-6 py-2.5 rounded-md font-medium transition-colors">
                    Add Your Business
                  </button>
                </div>
              </div>
              
              <div className="lg:col-span-2 w-full px-4 sm:px-5 flex justify-center items-center order-1 lg:order-2">
                <div className="w-full max-w-md lg:max-w-none lg:w-10/12">
                  <Image
                    width={600}
                    height={600}
                    src="/./landingLight.png"
                    className="w-full h-auto dark:hidden object-contain"
                    alt="Queue management illustration"
                    priority
                  />
                  <Image
                    width={600}
                    height={600}
                    src="/./LandingDark.png"
                    className="w-full h-auto hidden dark:block object-contain"
                    alt="Queue management illustration"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16 sm:mt-20 lg:mt-24 px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-3xl font-semibold pb-3">Available Services</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
              Browse and book your spot at various locations
              <svg className="w-5 h-5 text-[#359487] dark:text-[#C6FE02]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-semibold text-[#359487] dark:text-[#C6FE02] bg-[#359487]/10 dark:bg-[#C6FE02]/10 px-2 py-0.5 rounded-full">AI Powered</span>
            </p>
          </div>
          
          
          <div className="mt-6 sm:mt-8 flex items-center w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto space-x-2 px-4">
            <div className="relative w-full">
              <input 
                type="text" 
                id="simple-search" 
                className="rounded-xl px-3 sm:px-4 py-2.5 bg-white dark:bg-[#2b2825] border border-gray-300 dark:border-gray-600 text-sm sm:text-base focus:ring-2 focus:ring-[#359487] dark:focus:ring-[#C6FE02] focus:border-transparent block w-full placeholder:text-gray-400" 
                placeholder="Search Business name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="cursor-pointer dark:bg-[#C6FE02] dark:text-black bg-[#359487] rounded-xl inline-flex items-center justify-center shrink-0 text-white hover:bg-[#2a8074] dark:hover:bg-[#a7d404] focus:ring-4 focus:ring-[#359487]/30 dark:focus:ring-[#C6FE02]/30 shadow-sm w-10 h-10 sm:w-11 sm:h-11 focus:outline-none transition-colors disabled:opacity-50">
              {isSearching ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </div>
          
          <div className="mt-10 sm:mt-12 lg:mt-16 px-4 pb-10">
            <CardLists searchResults={searchResults} isSearching={isSearching} />
          </div>
        </div>
      </div>
    </>
  );
}
"use client";
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function ValueCard({ title, description, delay = 0 }) {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center p-6 bg-white dark:bg-[#2A2825] rounded-xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 dark:border-[#3A3835] min-w-[200px] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <IoMdCheckmarkCircleOutline className='text-white dark:text-black text-5xl mb-4 p-2 border-2 rounded-full border-[#359487] dark:border-[#C6FE02] bg-[#359487] dark:bg-[#C6FE02] animate-bounce'/>
      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        {title}
      </div>
      <div className="text-gray-600 dark:text-gray-400 text-sm">
        {description}
      </div>
    </div>
  );
}

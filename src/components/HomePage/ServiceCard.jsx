"use client";

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function ServiceCard({ icon: Icon, title, description, delay = 0 }) {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div
      ref={ref}
      className={`group bg-white dark:bg-[#2A2825] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-[#3A3835] hover:border-[#359487] dark:hover:border-[#C6FE02] hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-gradient-to-br from-[#359487] to-[#2a7569] dark:from-[#C6FE02] dark:to-[#a8d902] p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon size={28} className="text-white dark:text-black" />
      </div>
      <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-[#359487] dark:group-hover:text-[#C6FE02] transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

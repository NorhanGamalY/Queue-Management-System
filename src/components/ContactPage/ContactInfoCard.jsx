"use client";

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function ContactInfoCard({ icon: Icon, title, content, delay = 0 }) {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div
      ref={ref}
      className={`flex items-start gap-4 mb-8 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-gradient-to-br from-[#359487] to-[#2a7569] dark:from-[#C6FE02] dark:to-[#a8d902] p-4 rounded-xl shadow-lg hover:scale-110 transition-transform duration-300">
        <Icon size={24} className="text-white dark:text-black" />
      </div>
      <div>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{title}</p>
        <p className="dark:text-white font-medium text-lg">{content}</p>
      </div>
    </div>
  );
}

"use client";

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function StatsCard({ value, label, icon: Icon, delay = 0 }) {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div
      ref={ref}
      className={`bg-white dark:bg-[#2A2825] p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-[#3A3835] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Icon className="text-[#359487] dark:text-[#C6FE02] mb-3" size={32} />
      <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}

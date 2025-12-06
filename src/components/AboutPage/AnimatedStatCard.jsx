"use client";
import useCountAnimation from '@/hooks/useCountAnimation';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function AnimatedStatCard({ icon, title, value, delay = 0 }) {
  const [ref, isVisible] = useIntersectionObserver();
  const numericValue = parseInt(value);
  const suffix = value.replace(/[0-9]/g, '');
  const animatedCount = useCountAnimation(numericValue, 2000, isVisible);
  
  return (
    <div
      ref={ref}
      className={`bg-white dark:bg-[#2A2825] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-[#3A3835] min-w-[250px] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-[#359487] dark:text-[#C6FE02] text-5xl mb-4 flex justify-center animate-pulse">
        {icon}
      </div>
      <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
        {animatedCount}{suffix}
      </div>
      <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
        {title}
      </div>
    </div>
  );
}

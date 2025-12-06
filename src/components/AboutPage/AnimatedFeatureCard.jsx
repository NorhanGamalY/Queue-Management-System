"use client";
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function AnimatedFeatureCard({ icon, title, description, delay = 0 }) {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div
      ref={ref}
      className={`group bg-white dark:bg-[#2A2825] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 w-[98%] md:w-[30%] border border-gray-100 dark:border-[#3A3835] hover:border-[#359487] dark:hover:border-[#C6FE02] ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-[#359487] dark:text-[#C6FE02] text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-[#359487] dark:group-hover:text-[#C6FE02] transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

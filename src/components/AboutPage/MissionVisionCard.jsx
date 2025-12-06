"use client";
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function MissionVisionCard({ title, value, delay = 0 }) {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div
      ref={ref}
      className={`group bg-gradient-to-br from-[#359487] to-[#2a7569] dark:from-[#C6FE02] dark:to-[#a8d902] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 w-[98%] md:w-[45%] md:min-h-[300px] ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="text-3xl font-bold text-white dark:text-black mb-6 group-hover:scale-105 transition-transform">
        {title}
      </h3>
      <p className="text-white/90 dark:text-black/80 text-lg leading-relaxed">
        {value}
      </p>
    </div>
  );
}

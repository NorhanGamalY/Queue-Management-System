"use client";
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function SectionTitle({ children, delay = 0 }) {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <h2
      ref={ref}
      className={`text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </h2>
  );
}

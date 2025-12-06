"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/auth/me', {
          credentials: 'include',
        });

        if (!res.ok) {
          router.push('/login');
          return;
        }

        const data = await res.json();
        const userRole = data.data?.role;

        // Check if user has required role
        if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
          // Redirect based on user role
          if (userRole === 'user') {
            router.push('/user');
          } else if (userRole === 'business') {
            router.push('/business');
          } else if (userRole === 'admin') {
            router.push('/adminDashboard');
          } else {
            router.push('/');
          }
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, allowedRoles]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F3F3] dark:bg-[#221F1B]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#359487] dark:border-[#C6FE02] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

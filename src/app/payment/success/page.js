"use client";

import { CheckCircle, Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const session_id = searchParams.get('session_id');
    if (session_id) {
      setSessionId(session_id);
      setLoading(false);
      
      // Clear session storage
      sessionStorage.removeItem('paymentTicket');
      
      toast.success('Payment successful!');
      
      // Redirect to My Tickets after 2 seconds
      setTimeout(() => {
        // Add timestamp to force refresh
        router.push('/user?tab=myTickets&refresh=' + Date.now());
      }, 2000);
    } else {
      toast.error('Invalid payment session');
      router.push('/');
    }
  }, [router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F3F3F3] to-[#E8E8E8] dark:from-[#181715] dark:to-[#1F1D1A]">
        <Loader className="animate-spin h-12 w-12 text-[#359487] dark:text-[#C6FE02]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F3F3F3] to-[#E8E8E8] dark:from-[#181715] dark:to-[#1F1D1A] p-4">
      <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Your ticket has been confirmed and payment processed successfully.
        </p>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Session ID</p>
          <p className="text-xs font-mono text-gray-700 dark:text-gray-300 break-all">
            {sessionId}
          </p>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Redirecting to your tickets...
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-[#359487] dark:bg-[#C6FE02] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#359487] dark:bg-[#C6FE02] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-[#359487] dark:bg-[#C6FE02] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}

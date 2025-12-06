"use client";

import { XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function PaymentCancelPage() {
  const router = useRouter();

  useEffect(() => {
    toast.error('Payment cancelled');
  }, []);

  const handleTryAgain = () => {
    router.push('/payment');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const handleMyTickets = () => {
    router.push('/user?tab=myTickets');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F3F3F3] to-[#E8E8E8] dark:from-[#181715] dark:to-[#1F1D1A] p-4">
      <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={48} className="text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Payment Cancelled
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your payment was cancelled. No charges were made to your account.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={handleTryAgain}
            className="w-full bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            Try Again
          </button>
          
          <button
            onClick={handleMyTickets}
            className="w-full border-2 border-[#359487] dark:border-[#C6FE02] text-[#359487] dark:text-[#C6FE02] py-3 rounded-xl font-semibold hover:bg-[#359487]/10 dark:hover:bg-[#C6FE02]/10 transition-all"
          >
            View My Tickets
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            Go to Home
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
          Need help? Contact support
        </p>
      </div>
    </div>
  );
}

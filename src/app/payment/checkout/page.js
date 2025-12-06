"use client";

import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function StripeCheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    // Get ticket data from session storage
    const data = sessionStorage.getItem('paymentTicket');
    if (data) {
      const parsedData = JSON.parse(data);
      setTicketData(parsedData);
      
      // Automatically redirect to Stripe
      redirectToStripe(parsedData);
    } else {
      // Fallback to URL params
      const ticketId = searchParams.get('ticketId');
      const amount = searchParams.get('amount');
      
      if (ticketId && amount) {
        const data = {
          ticketId,
          amount: parseFloat(amount),
        };
        setTicketData(data);
        redirectToStripe(data);
      } else {
        toast.error('No payment information found');
        router.push('/');
      }
    }
  }, [router, searchParams]);

  const redirectToStripe = async (data) => {
    if (!data?.ticketId) return;

    try {
      // Call backend to create Stripe Checkout Session
      const response = await fetch('http://localhost:5000/api/v1/payments/create-checkout-session', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: data.ticketId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create checkout session');
      }

      const result = await response.json();

      // Redirect to Stripe hosted checkout
      if (result.sessionUrl) {
        window.location.href = result.sessionUrl;
      } else {
        throw new Error('No checkout URL received');
      }

    } catch (error) {
      console.error('Stripe redirect error:', error);
      toast.error(error.message || 'Failed to redirect to payment');
      
      // Redirect back to payment page after error
      setTimeout(() => {
        router.push('/payment');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F3F3F3] to-[#E8E8E8] dark:from-[#181715] dark:to-[#1F1D1A] p-4">
      <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-[#359487] dark:bg-[#C6FE02] rounded-full flex items-center justify-center mx-auto mb-6">
          <Loader size={48} className="text-white dark:text-black animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Redirecting to Stripe...
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Please wait while we redirect you to secure payment
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="w-2 h-2 bg-[#359487] dark:bg-[#C6FE02] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#359487] dark:bg-[#C6FE02] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-[#359487] dark:bg-[#C6FE02] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
          🔒 Secured by Stripe
        </p>
      </div>
    </div>
  );
}

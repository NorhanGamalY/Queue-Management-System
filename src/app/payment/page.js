"use client";

import { ArrowLeft, Building2, Calendar, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function PaymentPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    // Get booking data from session storage
    const data = sessionStorage.getItem('pendingBooking');
    if (data) {
      setBookingData(JSON.parse(data));
      setLoading(false);
    } else {
      toast.error('No booking data found');
      router.push('/');
    }
  }, [router]);

  const handlePayment = async () => {
    if (!bookingData) return;
    
    setProcessing(true);
    try {
      // Step 1: Create the ticket first (unpaid)
      const ticketResponse = await fetch(`http://localhost:5000/api/v1/tickets/businesses/${bookingData.businessId}/tickets`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          businessId: bookingData.businessId,
          queueId: bookingData.queueId,
          type: bookingData.type || 'examination',
          priority: bookingData.priority || 'normal'
        }),
      });

      if (!ticketResponse.ok) {
        const error = await ticketResponse.json();
        toast.error(error.message || 'Failed to create ticket');
        setProcessing(false);
        return;
      }

      const ticketData = await ticketResponse.json();
      const ticket = ticketData.data;

      // Step 2: Handle payment based on method
      const amount = 10.00; // Default ticket price

      if (paymentMethod === 'cash') {
        // For cash payment, just mark ticket as created (payment pending)
        toast.success(`Ticket created! Your number is #${ticket.ticketNumber}. Pay at the business.`);
        sessionStorage.removeItem('pendingBooking');
        
        setTimeout(() => {
          router.push('/user?tab=myTickets');
        }, 2000);
      } else if (paymentMethod === 'card') {
        // For card payment, redirect to Stripe checkout
        // Store ticket ID for after payment
        sessionStorage.setItem('paymentTicket', JSON.stringify({
          ticketId: ticket._id,
          ticketNumber: ticket.ticketNumber,
          amount: amount,
          businessName: bookingData.businessName
        }));
        
        sessionStorage.removeItem('pendingBooking');
        
        // Redirect to Stripe checkout page
        router.push(`/payment/checkout?ticketId=${ticket._id}&amount=${amount}`);
      }

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment processing failed');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#181715]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#359487] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3F3F3] to-[#E8E8E8] dark:from-[#181715] dark:to-[#1F1D1A] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#359487] dark:hover:text-[#C6FE02] mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Payment Card */}
        <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#359487] to-[#2a7569] dark:from-[#C6FE02] dark:to-[#a8d902] p-6">
            <h1 className="text-3xl font-bold text-white dark:text-black mb-2">
              Complete Your Booking
            </h1>
            <p className="text-white/90 dark:text-black/80">
              Secure payment for your ticket reservation
            </p>
          </div>

          {/* Booking Summary */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Booking Details
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Building2 size={20} className="text-[#359487] dark:text-[#C6FE02]" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Business</p>
                  <p className="font-medium text-gray-800 dark:text-white">{bookingData?.businessName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-[#359487] dark:text-[#C6FE02]" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Service Type</p>
                  <p className="font-medium text-gray-800 dark:text-white capitalize">{bookingData?.type || 'Examination'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Payment Method
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors hover:border-[#359487] dark:hover:border-[#C6FE02] has-[:checked]:border-[#359487] dark:has-[:checked]:border-[#C6FE02] has-[:checked]:bg-[#359487]/5 dark:has-[:checked]:bg-[#C6FE02]/5">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-[#359487] dark:text-[#C6FE02]"
                />
                <CreditCard size={24} className="text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Credit/Debit Card</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Pay securely with Stripe</p>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors hover:border-[#359487] dark:hover:border-[#C6FE02] has-[:checked]:border-[#359487] dark:has-[:checked]:border-[#C6FE02] has-[:checked]:bg-[#359487]/5 dark:has-[:checked]:bg-[#C6FE02]/5">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-[#359487] dark:text-[#C6FE02]"
                />
                <span className="text-2xl">💵</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Cash</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Pay at the business</p>
                </div>
              </label>
            </div>
          </div>

          {/* Stripe Payment Form (shown when card is selected) */}
          {paymentMethod === 'card' && (
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Card Details
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4 mb-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  🔒 Your payment information is encrypted and secure
                </p>
              </div>
              
              {/* Stripe Elements would go here */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Card Number
                  </label>
                  <div className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white">
                    {/* Stripe Card Element will be inserted here */}
                    <p className="text-sm text-gray-500 dark:text-gray-400">Stripe payment integration placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Summary */}
          <div className="p-6 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Total Amount</span>
              <span className="text-3xl font-bold text-[#359487] dark:text-[#C6FE02]">$10.00</span>
            </div>
            
            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <div className="w-6 h-6 border-3 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard size={24} />
                  Complete Payment
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              By completing this payment, you agree to our terms and conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

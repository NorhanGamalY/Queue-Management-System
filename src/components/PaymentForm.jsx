"use client";

import { usePayment } from '@/contexts/PaymentContext';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Check, CreditCard, Lock } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function PaymentForm({ amount, currency = 'usd', onSuccess, onCancel, metadata = {} }) {
  const stripe = useStripe();
  const elements = useElements();
  const { createPaymentIntent } = usePayment();
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: false,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Create payment intent on backend
      const { clientSecret, paymentIntentId } = await createPaymentIntent(
        amount,
        currency,
        metadata
      );

      // Confirm card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        toast.error(stripeError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        setSucceeded(true);
        toast.success('Payment successful!');
        
        // Call success callback
        if (onSuccess) {
          onSuccess({
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
          });
        }
      }

    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }

    setProcessing(false);
  };

  return (
    <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-lg p-6 max-w-md mx-auto">
      {succeeded ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Payment Successful!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your payment of ${(amount / 100).toFixed(2)} {currency.toUpperCase()} has been processed.
          </p>
          <button
            onClick={() => onSuccess && onSuccess()}
            className="bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black px-8 py-3 rounded-xl font-semibold hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors"
          >
            Continue
          </button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
              <CreditCard className="text-[#359487] dark:text-[#C6FE02]" size={28} />
              Payment Details
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Complete your payment securely
            </p>
          </div>

          {/* Amount Display */}
          <div className="bg-[#359487]/10 dark:bg-[#C6FE02]/10 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Amount</p>
            <p className="text-3xl font-bold text-[#359487] dark:text-[#C6FE02]">
              ${(amount / 100).toFixed(2)} <span className="text-lg">{currency.toUpperCase()}</span>
            </p>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Card Details
              </label>
              <div className="border-2 border-gray-200 dark:border-gray-600 rounded-xl p-4 focus-within:border-[#359487] dark:focus-within:border-[#C6FE02] transition-colors">
                <CardElement options={cardElementOptions} />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Security Badge */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <Lock size={16} />
              <span>Secured by Stripe. Your payment info is encrypted.</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={processing}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={!stripe || processing}
                className="flex-1 bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white dark:border-black" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Pay ${(amount / 100).toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

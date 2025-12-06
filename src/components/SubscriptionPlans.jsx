"use client";

import { Check, Crown, Rocket, X, Zap } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import PaymentForm from './PaymentForm';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    icon: Zap,
    price: 0,
    period: 'month',
    description: 'Perfect for getting started',
    features: [
      { text: 'Up to 50 appointments/month', included: true },
      { text: 'Basic queue management', included: true },
      { text: 'Email notifications', included: true },
      { text: 'Standard support', included: true },
      { text: 'Analytics dashboard', included: false },
      { text: 'Custom branding', included: false },
      { text: 'Priority support', included: false },
      { text: 'API access', included: false },
    ],
    popular: false,
  },
  {
    id: 'pro',
    name: 'Professional',
    icon: Crown,
    price: 29,
    period: 'month',
    description: 'For growing businesses',
    features: [
      { text: 'Up to 500 appointments/month', included: true },
      { text: 'Advanced queue management', included: true },
      { text: 'SMS & Email notifications', included: true },
      { text: 'Priority support', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'Custom branding', included: true },
      { text: 'Multi-user access', included: true },
      { text: 'API access', included: false },
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: Rocket,
    price: 99,
    period: 'month',
    description: 'For large organizations',
    features: [
      { text: 'Unlimited appointments', included: true },
      { text: 'Enterprise queue management', included: true },
      { text: 'All notification channels', included: true },
      { text: '24/7 Premium support', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Full branding control', included: true },
      { text: 'Unlimited users', included: true },
      { text: 'Full API access', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Dedicated account manager', included: true },
    ],
    popular: false,
  },
];

export default function SubscriptionPlans({ currentPlan = 'basic', onPlanChange }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const handleSelectPlan = (plan) => {
    if (plan.id === 'basic') {
      toast.success('You are on the Basic plan');
      return;
    }
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/subscription/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          planId: selectedPlan.id,
          paymentIntentId: paymentData.paymentIntentId,
          billingPeriod,
        }),
      });

      if (response.ok) {
        toast.success(`Subscribed to ${selectedPlan.name} plan!`);
        setShowPayment(false);
        if (onPlanChange) {
          onPlanChange(selectedPlan.id);
        }
      }
    } catch (error) {
      toast.error('Subscription failed');
    }
  };

  if (showPayment && selectedPlan) {
    const amount = billingPeriod === 'yearly' 
      ? selectedPlan.price * 10 * 100 // 2 months free
      : selectedPlan.price * 100;

    return (
      <div>
        <button
          onClick={() => setShowPayment(false)}
          className="mb-4 text-[#359487] dark:text-[#C6FE02] hover:underline flex items-center gap-1"
        >
          ← Back to Plans
        </button>

        <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Subscribe to {selectedPlan.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {selectedPlan.description}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-[#359487] dark:text-[#C6FE02]">
              ${billingPeriod === 'yearly' ? selectedPlan.price * 10 : selectedPlan.price}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              /{billingPeriod === 'yearly' ? 'year' : 'month'}
            </span>
          </div>
          {billingPeriod === 'yearly' && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
              🎉 Save ${selectedPlan.price * 2} with annual billing!
            </p>
          )}
        </div>

        <PaymentForm
          amount={amount}
          currency="usd"
          onSuccess={handlePaymentSuccess}
          onCancel={() => setShowPayment(false)}
          metadata={{ type: 'subscription', planId: selectedPlan.id }}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              billingPeriod === 'monthly'
                ? 'bg-white dark:bg-[#2b2825] text-[#359487] dark:text-[#C6FE02] shadow'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-6 py-2 rounded-full font-medium transition-colors relative ${
              billingPeriod === 'yearly'
                ? 'bg-white dark:bg-[#2b2825] text-[#359487] dark:text-[#C6FE02] shadow'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Yearly
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              -17%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = currentPlan === plan.id;
          const displayPrice = billingPeriod === 'yearly' ? plan.price * 10 : plan.price;

          return (
            <div
              key={plan.id}
              className={`bg-white dark:bg-[#2b2825] rounded-2xl shadow-lg p-6 relative border-2 transition-all hover:shadow-xl ${
                plan.popular
                  ? 'border-[#359487] dark:border-[#C6FE02] scale-105'
                  : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black text-xs font-bold px-4 py-1 rounded-full shadow">
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  plan.popular
                    ? 'bg-[#359487] dark:bg-[#C6FE02]'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <Icon
                    size={28}
                    className={plan.popular ? 'text-white dark:text-black' : 'text-gray-600 dark:text-gray-400'}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-[#359487] dark:text-[#C6FE02]">
                    ${displayPrice}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    /{billingPeriod === 'yearly' ? 'year' : 'month'}
                  </span>
                </div>
                {billingPeriod === 'yearly' && plan.price > 0 && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    Save ${plan.price * 2}/year
                  </p>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X size={20} className="text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${
                      feature.included
                        ? 'text-gray-700 dark:text-gray-300'
                        : 'text-gray-400 dark:text-gray-600 line-through'
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleSelectPlan(plan)}
                disabled={isCurrentPlan}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  isCurrentPlan
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black hover:bg-[#2a8074] dark:hover:bg-[#a7d404] shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {isCurrentPlan ? 'Current Plan' : plan.price === 0 ? 'Get Started' : 'Subscribe'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Enterprise Contact */}
      <div className="mt-8 bg-gradient-to-r from-[#359487] to-[#2a7569] dark:from-[#C6FE02] dark:to-[#a8d902] rounded-2xl p-8 text-center text-white dark:text-black">
        <h3 className="text-2xl font-bold mb-2">Need a custom solution?</h3>
        <p className="mb-4 opacity-90">
          Contact us for enterprise plans with custom features and dedicated support
        </p>
        <button className="bg-white dark:bg-black text-[#359487] dark:text-[#C6FE02] px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
          Contact Sales
        </button>
      </div>
    </div>
  );
}

"use client";

import { Calendar, Clock, Mail, MapPin, Phone, X } from 'lucide-react';

export default function BookingModal({ business, onClose, onCheckout, isProcessing }) {
  if (!business) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#359487] to-[#2a7569] dark:from-[#C6FE02] dark:to-[#a8d902] p-6 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white dark:text-black mb-2">
              {business.name}
            </h2>
            <p className="text-white/90 dark:text-black/80">
              {business.specialization || business.category || "General Service"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white dark:text-black hover:opacity-75 transition-opacity"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          {business.description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                About
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {business.description}
              </p>
            </div>
          )}

          {/* Business Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Business Information
            </h3>
            <div className="space-y-4">
              {/* Address */}
              {business.address && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#359487]/10 dark:bg-[#C6FE02]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-[#359487] dark:text-[#C6FE02]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</p>
                    <p className="text-gray-800 dark:text-white">
                      {business.address.street && `${business.address.street}, `}
                      {business.address.city || 'Not specified'}
                      {business.address.state && `, ${business.address.state}`}
                      {business.address.zipCode && ` ${business.address.zipCode}`}
                    </p>
                  </div>
                </div>
              )}

              {/* Phone */}
              {business.phoneNumber && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#359487]/10 dark:bg-[#C6FE02]/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-[#359487] dark:text-[#C6FE02]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                    <p className="text-gray-800 dark:text-white">{business.phoneNumber}</p>
                  </div>
                </div>
              )}

              {/* Email */}
              {business.email && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#359487]/10 dark:bg-[#C6FE02]/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-[#359487] dark:text-[#C6FE02]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</p>
                    <p className="text-gray-800 dark:text-white">{business.email}</p>
                  </div>
                </div>
              )}

              {/* Working Hours */}
              {business.workingHours && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#359487]/10 dark:bg-[#C6FE02]/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-[#359487] dark:text-[#C6FE02]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Working Hours</p>
                    <p className="text-gray-800 dark:text-white">
                      {business.workingHours.open && business.workingHours.close 
                        ? `${business.workingHours.open} - ${business.workingHours.close}`
                        : 'Hours not specified'}
                    </p>
                  </div>
                </div>
              )}

              {/* Rating & Status */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                {business.rating !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-xl">⭐</span>
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">
                      {business.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Rating</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${business.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`font-medium ${business.isOpen ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {business.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Calendar size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  Booking Information
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  You'll be redirected to the payment page to complete your booking. After successful payment, your ticket will be confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white dark:bg-[#2b2825] border-t border-gray-200 dark:border-gray-700 p-6 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log('Checkout clicked', { business, isProcessing });
              onCheckout();
            }}
            disabled={isProcessing}
            className="flex-1 px-6 py-3 bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Calendar size={20} />
                Proceed to Checkout
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

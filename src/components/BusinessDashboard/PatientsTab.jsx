"use client";

import { useTranslations } from '@/hooks/useTranslations';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function PatientsTab({ businessId }) {
  const { t } = useTranslations();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!businessId) return;
      try {
        const response = await fetch(`http://localhost:5000/api/v1/tickets/businesses/${businessId}/tickets`, {
          credentials: 'include',
        });
        if (response.ok) {
          const result = await response.json();
          setTickets(result.data || []);
        }
      } catch (error) {
        toast.error('Failed to fetch customers');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();

    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchTickets, 5000);
    return () => clearInterval(interval);
  }, [businessId]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#2b2825] rounded-2xl p-8 shadow-sm">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#359487] dark:border-[#C6FE02] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          All Customers
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Complete list of all tickets and customer information
        </p>
      </div>

      {tickets.length === 0 ? (
        <div className="bg-white dark:bg-[#2b2825] rounded-2xl p-8 shadow-sm">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No Customers Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Customers will appear here as they join your queue
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="bg-white dark:bg-[#2b2825] rounded-2xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700 hover:border-[#359487] dark:hover:border-[#C6FE02] transition-colors">
              {/* Header with Status */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {ticket.userId?.name || 'Guest Customer'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Queue: {ticket.queueId?.name || 'N/A'}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  ticket.status === 'served' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  ticket.status === 'called' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                  ticket.status === 'waiting' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {ticket.status}
                </span>
              </div>

              {/* Ticket Details in Gradient Boxes */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gradient-to-br from-[#359487] to-[#2a8074] dark:from-[#C6FE02] dark:to-[#a7d404] text-white dark:text-black rounded-lg p-3 text-center">
                  <p className="text-xs opacity-80 mb-1">Ticket #</p>
                  <p className="text-2xl font-bold">{ticket.ticketNumber || ticket.position}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-3 text-center">
                  <p className="text-xs opacity-80 mb-1">Position</p>
                  <p className="text-2xl font-bold">#{ticket.position}</p>
                </div>
              </div>

              {/* Booking Time */}
              {ticket.createdAt && (
                <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">📅 Booking Time</span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {new Date(ticket.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              )}

              {/* Payment & Service Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">💰 Payment</span>
                  <span className={`font-semibold ${
                    ticket.paymentStatus === 'paid' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {ticket.paymentStatus === 'paid' ? '✓ Paid' : '⏳ Unpaid'}
                  </span>
                </div>
                {ticket.estimatedPrice && (
                  <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">💵 Amount</span>
                    <span className="font-bold text-lg text-gray-800 dark:text-white">${ticket.estimatedPrice.toFixed(2)}</span>
                  </div>
                )}
                {ticket.serviceType && (
                  <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">🔧 Service</span>
                    <span className="font-semibold text-gray-800 dark:text-white">{ticket.serviceType}</span>
                  </div>
                )}
                {ticket.estimatedWaitTime && (
                  <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">⏱️ Est. Wait</span>
                    <span className="font-semibold text-gray-800 dark:text-white">~{ticket.estimatedWaitTime} mins</span>
                  </div>
                )}
              </div>

              {/* Customer Contact Info */}
              {ticket.userId && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border-l-4 border-[#359487] dark:border-[#C6FE02]">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">👤 Customer Information</p>
                  {ticket.userId.email && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">✉️ {ticket.userId.email}</p>
                  )}
                  {ticket.userId.phone && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">📞 {ticket.userId.phone}</p>
                  )}
                </div>
              )}

              {/* Notes */}
              {ticket.notes && (
                <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border-l-4 border-blue-500">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">📝 Notes</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{ticket.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

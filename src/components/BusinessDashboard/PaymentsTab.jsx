"use client";

import { useTranslations } from '@/hooks/useTranslations';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function PaymentsTab({ businessId }) {
  const { t } = useTranslations();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchPayments = async () => {
      if (!businessId) return;
      try {
        const response = await fetch(`http://localhost:5000/api/v1/payments/businesses/${businessId}/payments`, {
          credentials: 'include',
        });
        if (response.ok) {
          const result = await response.json();
          const paymentsData = result.data?.payments || [];
          setPayments(paymentsData);

          // Calculate stats
          const completed = paymentsData.filter(p => p.status === 'completed').length;
          const pending = paymentsData.filter(p => p.status === 'pending').length;
          const totalRevenue = paymentsData
            .filter(p => p.status === 'completed')
            .reduce((sum, p) => sum + (p.amount || 0), 0);

          setStats({
            total: paymentsData.length,
            completed,
            pending,
            totalRevenue: totalRevenue / 100 // Convert from cents
          });
        }
      } catch (error) {
        toast.error('Failed to fetch payments');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();

    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchPayments, 10000);
    return () => clearInterval(interval);
  }, [businessId]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#2b2825] rounded-2xl p-8 shadow-sm">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#359487] dark:border-[#C6FE02] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Payment History
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          All transactions and revenue from your business
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-[#2b2825] rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Payments</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-[#2b2825] rounded-xl shadow-sm p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
        </div>
        <div className="bg-white dark:bg-[#2b2825] rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</p>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
        </div>
        <div className="bg-white dark:bg-[#2b2825] rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">${stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="bg-white dark:bg-[#2b2825] rounded-2xl p-8 shadow-sm">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">💳</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No Payments Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Payments will appear here when customers pay
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {payments.map((payment) => (
            <div key={payment._id} className="bg-white dark:bg-[#2b2825] rounded-2xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700 hover:border-[#359487] dark:hover:border-[#C6FE02] transition-colors">
              {/* Header with Status */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {payment.userId?.name || 'Guest Customer'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                    TX: {payment.transactionId || payment._id.slice(-8)}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  payment.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  payment.status === 'refunded' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {payment.status}
                </span>
              </div>

              {/* Amount in Large Display */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-6 mb-4 text-center">
                <p className="text-sm opacity-90 mb-1">Amount Received</p>
                <p className="text-4xl font-bold">${(payment.amount / 100).toFixed(2)}</p>
              </div>

              {/* Payment Details Grid */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">📅 Date</span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {new Date(payment.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">🕐 Time</span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {new Date(payment.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                {payment.ticketId && (
                  <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">🎫 Ticket</span>
                    <span className="font-semibold text-[#359487] dark:text-[#C6FE02]">
                      #{payment.ticketId?.ticketNumber || 'N/A'}
                    </span>
                  </div>
                )}
                {payment.paymentMethod && (
                  <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">💳 Method</span>
                    <span className="font-semibold text-gray-800 dark:text-white capitalize">
                      {payment.paymentMethod}
                    </span>
                  </div>
                )}
              </div>

              {/* Customer Contact Info */}
              {payment.userId && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border-l-4 border-[#359487] dark:border-[#C6FE02]">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">👤 Customer Information</p>
                  {payment.userId.email && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">✉️ {payment.userId.email}</p>
                  )}
                  {payment.userId.phone && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">📞 {payment.userId.phone}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

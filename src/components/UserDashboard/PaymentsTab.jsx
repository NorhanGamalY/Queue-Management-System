"use client";

export default function PaymentsTab({ t, myPayments, loadingPayments }) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {t('userDashboard.payments.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('userDashboard.payments.subtitle')}
        </p>
      </div>

      {loadingPayments ? (
        <div className="bg-white dark:bg-[#2b2825] rounded-2xl p-8 shadow-sm">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#359487] dark:border-[#C6FE02] mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading payments...</p>
          </div>
        </div>
      ) : myPayments.length === 0 ? (
        <div className="bg-white dark:bg-[#2b2825] rounded-2xl p-8 shadow-sm">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">💳</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {t('userDashboard.payments.noPayments')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('userDashboard.payments.subtitle')}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {myPayments.map((payment) => (
            <div key={payment._id} className="bg-white dark:bg-[#2b2825] rounded-2xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700 hover:border-[#359487] dark:hover:border-[#C6FE02] transition-colors">
              {/* Header with Status */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {payment.businessId?.name || 'N/A'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Transaction: {payment.transactionId || payment._id.slice(-8)}
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
                <p className="text-sm opacity-90 mb-1">Amount Paid</p>
                <p className="text-4xl font-bold">${(payment.amount / 100).toFixed(2)}</p>
              </div>

              {/* Payment Details Grid */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">📅 Payment Date</span>
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
                    <span className="text-sm text-gray-600 dark:text-gray-400">🎫 Ticket Number</span>
                    <span className="font-semibold text-[#359487] dark:text-[#C6FE02]">
                      #{payment.ticketId?.ticketNumber || 'N/A'}
                    </span>
                  </div>
                )}
                {payment.paymentMethod && (
                  <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">💳 Payment Method</span>
                    <span className="font-semibold text-gray-800 dark:text-white capitalize">
                      {payment.paymentMethod}
                    </span>
                  </div>
                )}
              </div>

              {/* Business Contact Info */}
              {payment.businessId && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border-l-4 border-[#359487] dark:border-[#C6FE02]">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">🏪 Business Information</p>
                  {payment.businessId.address && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">📍 {payment.businessId.address}</p>
                  )}
                  {payment.businessId.phone && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">📞 {payment.businessId.phone}</p>
                  )}
                  {payment.businessId.email && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">✉️ {payment.businessId.email}</p>
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

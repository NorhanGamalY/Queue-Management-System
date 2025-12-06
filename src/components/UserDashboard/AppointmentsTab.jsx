"use client";

import { FaCalendarAlt } from "react-icons/fa";

export default function AppointmentsTab({ t, myTickets, loadingTickets }) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {t('userDashboard.appointments.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('userDashboard.appointments.subtitle')}
        </p>
      </div>

      {loadingTickets ? (
        <div className="bg-white dark:bg-[#2b2825] rounded-2xl p-8 shadow-sm">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#359487] dark:border-[#C6FE02] mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading appointments...</p>
          </div>
        </div>
      ) : myTickets.length === 0 ? (
        <div className="bg-white dark:bg-[#2b2825] rounded-2xl p-8 shadow-sm">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">📅</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {t('userDashboard.appointments.noAppointments')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('userDashboard.appointments.subtitle')}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {myTickets.map((ticket) => (
            <div key={ticket._id} className="bg-gradient-to-br from-white to-gray-50 dark:from-[#2b2825] dark:to-[#1f1c1a] rounded-2xl p-6 shadow-lg border-2 border-[#359487]/20 dark:border-[#C6FE02]/20">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {ticket.businessId?.name || 'Business'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {ticket.queueId?.name || 'General Queue'}
                  </p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                  ticket.status === 'served' ? 'bg-green-500 text-white' :
                  ticket.status === 'called' ? 'bg-blue-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}>
                  {ticket.status?.toUpperCase()}
                </span>
              </div>

              {/* Appointment Time */}
              <div className="bg-[#359487] dark:bg-[#C6FE02] rounded-xl p-4 mb-4 text-white dark:text-black">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt size={24} />
                  <div>
                    <p className="text-xs opacity-90">Appointment Date & Time</p>
                    <p className="text-lg font-bold">
                      {new Date(ticket.createdAt).toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Ticket Number</span>
                  <span className="font-bold text-lg text-[#359487] dark:text-[#C6FE02]">#{ticket.ticketNumber || ticket.position}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Queue Position</span>
                  <span className="font-semibold text-gray-800 dark:text-white">#{ticket.position}</span>
                </div>
                {ticket.estimatedWaitTime && (
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Est. Wait Time</span>
                    <span className="font-semibold text-gray-800 dark:text-white">~{ticket.estimatedWaitTime} mins</span>
                  </div>
                )}
                {ticket.estimatedPrice && (
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Price</span>
                    <span className="font-bold text-lg text-green-600 dark:text-green-400">${ticket.estimatedPrice.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Payment Status</span>
                  <span className={`font-semibold ${
                    ticket.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {ticket.paymentStatus === 'paid' ? '✓ Paid' : '⏳ Unpaid'}
                  </span>
                </div>
              </div>

              {/* Business Info */}
              {ticket.businessId && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">🏪 Business Details</p>
                  {ticket.businessId.address && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">📍 {ticket.businessId.address}</p>
                  )}
                  {ticket.businessId.phone && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">📞 {ticket.businessId.phone}</p>
                  )}
                  {ticket.businessId.email && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">✉️ {ticket.businessId.email}</p>
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

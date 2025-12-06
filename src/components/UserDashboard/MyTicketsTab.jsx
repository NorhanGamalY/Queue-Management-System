"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { FaCalendarAlt, FaClock, FaTimes } from "react-icons/fa";

export default function MyTicketsTab({ t, myTickets, loadingTickets, setMyTickets }) {
  const [cancellingId, setCancellingId] = useState(null);

  const handleCancelTicket = async (ticketId) => {
    if (!confirm('Are you sure you want to cancel this ticket?')) return;

    setCancellingId(ticketId);
    try {
      const response = await fetch(`http://localhost:5000/api/v1/tickets/tickets/${ticketId}/cancel`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'User cancelled' }),
      });

      if (response.ok) {
        setMyTickets(prevTickets => 
          prevTickets.map(t => 
            t._id === ticketId ? { ...t, status: 'cancelled' } : t
          )
        );
        toast.success('Ticket cancelled successfully');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to cancel ticket');
      }
    } catch (error) {
      console.error('Error cancelling ticket:', error);
      toast.error('Failed to cancel ticket');
    } finally {
      setCancellingId(null);
    }
  };
  return (
    <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <BsTicketPerforatedFill /> {t('userDashboard.tabs.tickets')}
      </h2>
      
      {loadingTickets ? (
        <div className="bg-white dark:bg-[#2b2825] rounded-2xl p-12 text-center shadow-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#359487] dark:border-[#C6FE02] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading tickets...</p>
        </div>
      ) : myTickets.length === 0 ? (
        <div className="bg-white dark:bg-[#2b2825] rounded-2xl p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-5xl">🎫</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {t('userDashboard.noTickets')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start booking to see your tickets here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {myTickets.map((ticket) => (
            <div key={ticket._id} className="bg-white dark:bg-[#2b2825] rounded-2xl p-6 shadow-lg border-2 border-gray-100 dark:border-gray-700 hover:border-[#359487] dark:hover:border-[#C6FE02] transition-all">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {ticket.businessId?.name || 'Business'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {ticket.queueId?.name || 'General Queue'}
                  </p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase ${
                  ticket.status === 'served' ? 'bg-green-500 text-white' :
                  ticket.status === 'called' ? 'bg-blue-500 text-white' :
                  ticket.status === 'cancelled' ? 'bg-red-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}>
                  {ticket.status}
                </span>
              </div>

              {/* Ticket Numbers */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gradient-to-br from-[#359487] to-[#2a7569] dark:from-[#C6FE02] dark:to-[#a8d902] rounded-xl p-4 text-white dark:text-black">
                  <p className="text-xs opacity-90 mb-1">Ticket #</p>
                  <p className="text-2xl font-bold">#{ticket.ticketNumber || ticket.position}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Position</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{ticket.position}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <FaCalendarAlt className="text-[#359487] dark:text-[#C6FE02]" />
                    Booked
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {new Date(ticket.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                {ticket.estimatedWaitTime && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <FaClock className="text-[#359487] dark:text-[#C6FE02]" />
                      Est. Wait
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      ~{ticket.estimatedWaitTime} mins
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Payment</span>
                  <span className={`font-semibold ${
                    ticket.paymentStatus === 'paid' ? 'text-green-600 dark:text-green-400' :
                    ticket.paymentStatus === 'refunded' ? 'text-orange-600 dark:text-orange-400' :
                    'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {ticket.paymentStatus === 'paid' ? '✓ Paid' : 
                     ticket.paymentStatus === 'unpaid' ? '⏳ Unpaid' :
                     ticket.paymentStatus}
                  </span>
                </div>

                {ticket.estimatedPrice && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Price</span>
                    <span className="font-bold text-lg text-[#359487] dark:text-[#C6FE02]">
                      ${ticket.estimatedPrice.toFixed(2)}
                    </span>
                  </div>
                )}

                {ticket.serviceType && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Service</span>
                    <span className="font-semibold text-gray-800 dark:text-white capitalize">
                      {ticket.serviceType}
                    </span>
                  </div>
                )}
              </div>

              {/* Business Contact */}
              {ticket.businessId && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mb-4 text-xs">
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Business Contact</p>
                  {ticket.businessId.phone && (
                    <p className="text-gray-600 dark:text-gray-400">📞 {ticket.businessId.phone}</p>
                  )}
                  {ticket.businessId.email && (
                    <p className="text-gray-600 dark:text-gray-400">✉️ {ticket.businessId.email}</p>
                  )}
                </div>
              )}

              {/* Notes */}
              {ticket.notes && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Notes</p>
                  <p className="text-sm text-gray-800 dark:text-white">{ticket.notes}</p>
                </div>
              )}

              {/* Cancel Button */}
              {ticket.status === 'waiting' && (
                <button
                  onClick={() => handleCancelTicket(ticket._id)}
                  disabled={cancellingId === ticket._id}
                  className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  {cancellingId === ticket._id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <FaTimes /> Cancel Ticket
                    </>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

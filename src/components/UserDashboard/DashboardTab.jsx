"use client";

import { useSocket } from '@/contexts/SocketContext';
import { useEffect, useState } from 'react';
import { BsTicketPerforatedFill } from "react-icons/bs";

export default function DashboardTab({ 
  t, 
  userData, 
  day, 
  dayName, 
  monthName, 
  year, 
  time
}) {
  const [activeTicket, setActiveTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket();

  // Fetch active ticket on mount
  useEffect(() => {
    const fetchActiveTicket = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/tickets/users/me/tickets', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          console.log('Dashboard tickets data:', data);
          const active = data.data?.find(t => ['waiting', 'called', 'served'].includes(t.status));
          console.log('Active ticket:', active);
          setActiveTicket(active || null);
        } else {
          console.error('Failed to fetch tickets:', res.status);
        }
      } catch (error) {
        console.error('Error fetching active ticket:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchActiveTicket();
    
    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchActiveTicket, 5000);
    return () => clearInterval(interval);
  }, []);

  // Socket integration for real-time updates
  useEffect(() => {
    if (!socket || !userData?._id) return;

    socket.emit('joinUserRoom', userData._id);

    socket.on('yourTurn', (ticket) => {
      setActiveTicket(ticket);
      // Show browser notification
      if (Notification.permission === 'granted') {
        new Notification("It's Your Turn!", {
          body: `Ticket #${ticket.ticketNumber || ticket.position} - Please proceed`,
          icon: '/logo.png',
        });
      }
    });

    socket.on('ticketUpdated', (updatedTicket) => {
      if (activeTicket?._id === updatedTicket._id) {
        if (['waiting', 'called'].includes(updatedTicket.status)) {
          setActiveTicket(updatedTicket);
        } else {
          setActiveTicket(null);
        }
      }
    });

    return () => {
      socket.off('yourTurn');
      socket.off('ticketUpdated');
    };
  }, [socket, userData, activeTicket]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div>
      {/* Header Card */}
      <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 mb-8 transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              {t('userDashboard.greeting')}, {userData?.name?.split(" ")[0]}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t('userDashboard.date')}: {dayName}, {monthName} {day}, {year}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <p className="font-semibold text-gray-800 dark:text-white text-2xl md:text-3xl">{time}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Queue Ticket Card or Empty State */}
      {loading ? (
        <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-12 text-center mb-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#359487] dark:border-[#C6FE02] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      ) : activeTicket ? (
        <div className="bg-gradient-to-br from-[#359487] to-[#2a7569] dark:from-[#359487] dark:to-[#2d6a60] rounded-2xl shadow-lg p-6 md:p-8 mb-8 text-white transition-colors duration-300">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              <BsTicketPerforatedFill /> Active Queue Ticket
            </h2>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              activeTicket.status === 'served' ? 'bg-green-500' :
              activeTicket.status === 'called' ? 'bg-blue-500' :
              activeTicket.status === 'cancelled' ? 'bg-red-500' :
              'bg-yellow-500'
            }`}>
              {activeTicket.status?.toUpperCase()}
            </span>
          </div>

          {/* Main Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Business</p>
              <p className="text-lg font-bold">
                {activeTicket.businessId?.name || 'N/A'}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Queue</p>
              <p className="text-lg font-bold">
                {activeTicket.queueId?.name || 'N/A'}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Your Number</p>
              <p className="text-2xl font-bold">
                #{activeTicket.ticketNumber || activeTicket.position}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Position</p>
              <p className="text-2xl font-bold">
                {activeTicket.position}
              </p>
            </div>
          </div>

          {/* Additional Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Est. Wait Time</p>
              <p className="text-lg font-semibold">
                {activeTicket.estimatedWaitTime ? `~${activeTicket.estimatedWaitTime} mins` : 'Calculating...'}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Booked At</p>
              <p className="text-lg font-semibold">
                {new Date(activeTicket.createdAt).toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Payment Status</p>
              <p className="text-lg font-semibold capitalize">
                {activeTicket.paymentStatus === 'paid' ? '✓ Paid' : 
                 activeTicket.paymentStatus === 'unpaid' ? '⏳ Unpaid' : 
                 activeTicket.paymentStatus}
              </p>
            </div>
          </div>

          {/* Price & Service Info */}
          {(activeTicket.estimatedPrice || activeTicket.serviceType) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {activeTicket.estimatedPrice && (
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <p className="text-sm opacity-90 mb-1">Estimated Price</p>
                  <p className="text-2xl font-bold">
                    ${activeTicket.estimatedPrice.toFixed(2)}
                  </p>
                </div>
              )}
              {activeTicket.serviceType && (
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <p className="text-sm opacity-90 mb-1">Service Type</p>
                  <p className="text-lg font-semibold capitalize">
                    {activeTicket.serviceType}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Business Contact Info */}
          {activeTicket.businessId && (
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-6">
              <p className="text-sm opacity-90 mb-3">Business Information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {activeTicket.businessId.email && (
                  <div>
                    <span className="opacity-75">Email: </span>
                    <span className="font-semibold">{activeTicket.businessId.email}</span>
                  </div>
                )}
                {activeTicket.businessId.phone && (
                  <div>
                    <span className="opacity-75">Phone: </span>
                    <span className="font-semibold">{activeTicket.businessId.phone}</span>
                  </div>
                )}
                {activeTicket.businessId.address && (
                  <div className="sm:col-span-2">
                    <span className="opacity-75">Address: </span>
                    <span className="font-semibold">{activeTicket.businessId.address}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {activeTicket.notes && (
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-6">
              <p className="text-sm opacity-90 mb-2">Notes</p>
              <p className="text-base">{activeTicket.notes}</p>
            </div>
          )}

          {/* Queue Progress Bar */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <div className="flex justify-between mb-2 text-sm">
              <span>Queue Progress</span>
              <span>Position {activeTicket.position}</span>
            </div>
            <div className="bg-white/20 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-white h-full rounded-full transition-all duration-500 shadow-lg"
                style={{ 
                  width: `${Math.max(5, Math.min(100, ((activeTicket.queueId?.currentTicket || 1) / activeTicket.position) * 100))}%` 
                }}
              ></div>
            </div>
            <p className="text-xs opacity-75 mt-2 text-center">
              {activeTicket.status === 'called' 
                ? '🔔 Your turn! Please proceed to the counter' 
                : activeTicket.status === 'served'
                ? '✅ Service completed'
                : `⏳ Waiting... ${activeTicket.position - (activeTicket.queueId?.currentTicket || 0)} people ahead`
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-12 text-center mb-8">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-5xl">🎫</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            No Active Tickets
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Search for businesses and book an appointment to get started
          </p>
        </div>
      )}
    </div>
  );
}

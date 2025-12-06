"use client";

import { useSocket } from '@/contexts/SocketContext';
import { useTranslations } from '@/hooks/useTranslations';
import { Phone } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function DashboardTab({ businessData }) {
  const { t } = useTranslations();
  const { socket, connected } = useSocket();
  const [stats, setStats] = useState({
    todaysPatients: 0,
    inQueue: 0,
    completed: 0,
    avgWaitTime: 0
  });
  const [tickets, setTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQueueMenu, setShowQueueMenu] = useState(false);
  const [queue, setQueue] = useState(null);
  const [queueLoading, setQueueLoading] = useState(false);
  const [calling, setCalling] = useState(false);
  const hasJoinedRoom = useRef(false);

  const fetchTickets = useCallback(async () => {
    if (!businessData?._id) return;
    try {
      const response = await fetch(`http://localhost:5000/api/v1/tickets/businesses/${businessData._id}/tickets`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setTickets(data.data || data.tickets || []);
      }
    } catch (error) {
      console.error('Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  }, [businessData]);

  const fetchQueue = useCallback(async () => {
    if (!businessData?._id) return;
    try {
      const response = await fetch(`http://localhost:5000/api/v1/queues/business/${businessData._id}/queue`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setQueue(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch queue');
    }
  }, [businessData]);

  const fetchStats = useCallback(async () => {
    if (!businessData?._id) return;
    try {
      const response = await fetch(`http://localhost:5000/api/v1/stats/business/${businessData._id}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setStats({
          todaysPatients: data.data?.overview?.todayTickets || 0,
          inQueue: data.data?.overview?.waitingTickets || 0,
          completed: data.data?.overview?.completedTickets || 0,
          avgWaitTime: data.data?.performance?.averageWaitTime || 0
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  }, [businessData]);

  // Initial data fetch
  useEffect(() => {
    if (businessData?._id) {
      setLoading(true);
      fetchQueue();
      fetchTickets();
      fetchStats();
    }
  }, [businessData?._id]);

  // Auto-refresh data every 5 seconds to show new tickets without manual refresh
  useEffect(() => {
    if (!businessData?._id) return;

    const refreshInterval = setInterval(() => {
      fetchQueue();
      fetchTickets();
      fetchStats();
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(refreshInterval);
  }, [businessData?._id, fetchQueue, fetchTickets, fetchStats]);

  // Socket room join and listeners - separate effect
  useEffect(() => {
    if (!socket || !businessData?._id) return;

    // Check if already joined to prevent duplicate joins
    if (hasJoinedRoom.current) {
      console.log('⏭️ Already joined business room, skipping');
      return;
    }

    // Join business room once
    console.log('📡 Joining business room:', businessData._id);
    socket.emit('joinBusiness', { businessId: businessData._id });
    hasJoinedRoom.current = true;

    // Listen for ticket updates
    const handleTicketCreated = () => {
      fetchQueue();
      fetchTickets();
      fetchStats();
    };

    const handleTicketUpdated = () => {
      fetchQueue();
      fetchTickets();
      fetchStats();
    };

    socket.on('ticketCreated', handleTicketCreated);
    socket.on('ticketUpdated', handleTicketUpdated);

    return () => {
      socket.off('ticketCreated', handleTicketCreated);
      socket.off('ticketUpdated', handleTicketUpdated);
      // Don't reset hasJoinedRoom here to prevent re-joining on StrictMode remount
      console.log('🔌 Cleaned up business room listeners');
    };
  }, [socket, businessData?._id]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showQueueMenu && !event.target.closest('.queue-menu-container')) {
        setShowQueueMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showQueueMenu]);

  const handleOpenQueue = async () => {
    if (!queue) {
      toast.error('Queue not initialized');
      return;
    }
    
    try {
      setQueueLoading(true);
      setShowQueueMenu(false);
      
      const response = await fetch(`http://localhost:5000/api/v1/queues/queue/${queue._id}/resume`, {
        method: 'PATCH',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setQueue(data.data);
        toast.success('Queue opened successfully');
        fetchQueue();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to open queue');
      }
    } catch (error) {
      toast.error('Failed to open queue');
      console.error('Open queue error:', error);
    } finally {
      setQueueLoading(false);
    }
  };

  const handlePauseQueue = async () => {
    if (!queue) {
      toast.error('Queue not initialized');
      return;
    }
    
    try {
      setQueueLoading(true);
      setShowQueueMenu(false);
      
      const response = await fetch(`http://localhost:5000/api/v1/queues/queue/${queue._id}/pause`, {
        method: 'PATCH',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setQueue(data.data);
        toast.success('Queue paused successfully');
        fetchQueue();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to pause queue');
      }
    } catch (error) {
      toast.error('Failed to pause queue');
      console.error('Pause queue error:', error);
    } finally {
      setQueueLoading(false);
    }
  };

  const handleCloseQueue = async () => {
    if (!queue) {
      toast.error('Queue not initialized');
      return;
    }
    
    try {
      setQueueLoading(true);
      setShowQueueMenu(false);
      
      const response = await fetch(`http://localhost:5000/api/v1/queues/queue/${queue._id}/close`, {
        method: 'PATCH',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Queue closed successfully:', data);
        setQueue(data.data);
        toast.success('Queue closed successfully');
        fetchQueue();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to close queue');
      }
    } catch (error) {
      toast.error('Failed to close queue');
      console.error('Close queue error:', error);
    } finally {
      setQueueLoading(false);
    }
  };

  const handleAddWalkIn = async () => {
    try {
      if (!queue?._id) {
        toast.error('Queue not initialized');
        return;
      }
      
      const response = await fetch(`http://localhost:5000/api/v1/tickets/businesses/${businessData?._id}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          businessId: businessData?._id,
          queueId: queue._id,
          type: 'examination',
          priority: 'normal',
        }),
      });
      
      if (response.ok) {
        toast.success('Walk-in patient added');
        fetchTickets();
        fetchStats();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to add walk-in');
      }
    } catch (error) {
      toast.error('Failed to add walk-in patient');
    }
  };

  const handleCallNext = async () => {
    if (queue?.status !== 'active') {
      toast.error('Queue is not active');
      return;
    }

    setCalling(true);
    try {
      const nextTicket = tickets.find(t => t.status === 'waiting');
      if (!nextTicket) {
        toast.error('No waiting tickets');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/v1/tickets/tickets/${nextTicket._id}/call`, {
        method: 'PUT',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentTicket(data.ticket);
        
        if (socket) {
          socket.emit('callNext', { ticketId: nextTicket._id, businessId: businessData._id });
        }
        
        toast.success(`Ticket #${nextTicket.number} called`);
        fetchTickets();
        fetchStats();
      } else {
        toast.error('Failed to call next ticket');
      }
    } catch (error) {
      toast.error('Network error');
    } finally {
      setCalling(false);
    }
  };

  const handleCallTicket = async (ticketId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/tickets/tickets/${ticketId}/call`, {
        method: 'PUT',
        credentials: 'include',
      });
      if (response.ok) {
        toast.success('Ticket called');
        fetchTickets();
        fetchStats();
      }
    } catch (error) {
      toast.error('Failed to call ticket');
    }
  };

  const handleCompleteTicket = async (ticketId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/tickets/tickets/${ticketId}/serve`, {
        method: 'PUT',
        credentials: 'include',
      });
      if (response.ok) {
        toast.success('Ticket completed');
        fetchTickets();
        fetchStats();
      }
    } catch (error) {
      toast.error('Failed to complete ticket');
    }
  };

  const handleSkipTicket = async (ticketId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/tickets/tickets/${ticketId}/no-show`, {
        method: 'PATCH',
        credentials: 'include',
      });
      if (response.ok) {
        toast.success('Ticket marked as no-show');
        fetchTickets();
        fetchStats();
      }
    } catch (error) {
      toast.error('Failed to mark ticket as no-show');
    }
  };

  const handleCancelTicket = async (ticketId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/tickets/tickets/${ticketId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ reason: 'Cancelled by staff' }),
      });
      if (response.ok) {
        toast.success('Ticket cancelled');
        fetchTickets();
        fetchStats();
      } else {
        toast.error('Failed to cancel ticket');
      }
    } catch (error) {
      toast.error('Failed to cancel ticket');
    }
  };

  const waitingTickets = tickets.filter(t => t.status === 'waiting');
  const servingTickets = tickets.filter(t => t.status === 'serving');
  const servingTicket = servingTickets[0];
  const nextTicket = waitingTickets[0];

  if (loading && !businessData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-[#359487] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 mb-8 transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{businessData?.name || 'Business Dashboard'}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Thursday, November 13, 2025 • 10:30 AM</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <span className="text-2xl">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="relative queue-menu-container">
              <button
                onClick={() => setShowQueueMenu(!showQueueMenu)}
                disabled={queueLoading || !queue}
                className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-all ${
                  queue?.status === 'active'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                    : queue?.status === 'paused'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                } ${queueLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                title={!queue ? 'Queue not loaded' : 'Manage queue status'}
              >
                ● {queue?.status === 'active' ? t('businessDashboard.dashboard.open') : queue?.status === 'paused' ? 'Paused' : 'Closed'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showQueueMenu && queue && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="py-1">
                    {queue.status !== 'active' && (
                      <button
                        onClick={handleOpenQueue}
                        className="w-full text-left px-4 py-2 text-sm text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Open Queue
                      </button>
                    )}
                    {queue.status === 'active' && (
                      <button
                        onClick={handlePauseQueue}
                        className="w-full text-left px-4 py-2 text-sm text-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        Pause Queue
                      </button>
                    )}
                    {(queue.status === 'active' || queue.status === 'paused') && (
                      <button
                        onClick={handleCloseQueue}
                        className="w-full text-left px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        Close Queue
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-2">{t('businessDashboard.dashboard.todaysPatients')}</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-bold text-gray-800 dark:text-white mb-1">{stats.todaysPatients}</p>
            </div>
            <div className="text-4xl opacity-70">👥</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-2">{t('businessDashboard.dashboard.inQueue')}</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-bold text-gray-800 dark:text-white mb-1">{stats.inQueue}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('common.waiting')}</p>
            </div>
            <div className="text-4xl opacity-70">🎟️</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-2">{t('businessDashboard.dashboard.completed')}</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-bold text-gray-800 dark:text-white mb-1">{stats.completed}</p>
              <p className="text-sm text-green-600 dark:text-green-400">{t('common.onSchedule')}</p>
            </div>
            <div className="text-4xl opacity-70">✅</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
          <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-2">{t('businessDashboard.dashboard.avgWaitTime')}</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-bold text-gray-800 dark:text-white mb-1">{stats.avgWaitTime}{t('businessDashboard.dashboard.minutes')}</p>
            </div>
            <div className="text-4xl opacity-70">⏱️</div>
          </div>
        </div>
      </div>

      {/* Currently Serving Section */}
      {servingTicket && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 md:p-8 mb-8 text-white">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Phone size={20} />
            Currently Serving
          </h3>
          <div className="bg-white/20 backdrop-blur rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl flex items-center justify-center font-bold text-3xl bg-white/30">
                #{servingTicket.number}
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">{servingTicket.userId?.name || 'Guest'}</h4>
                <p className="text-sm opacity-90">{servingTicket.userId?.phone || 'No phone'}</p>
              </div>
            </div>
            <button
              onClick={() => handleCompleteTicket(servingTicket._id)}
              className="px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all flex items-center gap-2"
            >
              ✓ Complete
            </button>
          </div>
        </div>
      )}

      {/* Call Next / Queue Control */}
      <div className="bg-[#359487] dark:bg-[#C6FE02] rounded-2xl shadow-lg p-6 md:p-8 mb-8 text-white dark:text-black transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            🎯 {t('businessDashboard.dashboard.queueControl')}
          </h2>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <button 
              onClick={handleCallNext}
              disabled={calling || !nextTicket || queue?.status !== 'active'}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white dark:bg-black text-[#359487] dark:text-[#C6FE02] px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ${calling || !nextTicket || queue?.status !== 'active' ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <Phone size={18} />
              {calling ? 'Calling...' : 'Call Next Patient'}
            </button>
            <button 
              onClick={() => queue?.status === 'active' ? handlePauseQueue() : handleOpenQueue()}
              disabled={queueLoading || !queue}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white dark:bg-black text-[#359487] dark:text-[#C6FE02] px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ${queueLoading || !queue ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <span>{queue?.status === 'active' ? '⏸️' : '▶️'}</span>
              {queue?.status === 'active' ? t('businessDashboard.dashboard.pauseQueue') : t('businessDashboard.dashboard.resumeQueue')}
            </button>
            <button 
              onClick={handleAddWalkIn}
              disabled={queue?.status !== 'active'}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white dark:bg-black text-[#359487] dark:text-[#C6FE02] px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ${queue?.status !== 'active' ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <span>➕</span>
              {t('businessDashboard.dashboard.addWalkin')}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur rounded-xl p-4 text-center">
            <p className="text-sm opacity-90 mb-2">Next In Line</p>
            <p className="text-2xl md:text-3xl font-bold">{nextTicket ? `#${nextTicket.ticketNumber}` : t('businessDashboard.dashboard.none')}</p>
          </div>
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur rounded-xl p-4 text-center">
            <p className="text-sm opacity-90 mb-2">{t('businessDashboard.dashboard.totalInQueue')}</p>
            <p className="text-2xl md:text-3xl font-bold">{waitingTickets.length}</p>
          </div>
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur rounded-xl p-4 text-center">
            <p className="text-sm opacity-90 mb-2">Currently Serving</p>
            <p className="text-2xl md:text-3xl font-bold">{servingTickets.length}</p>
          </div>
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur rounded-xl p-4 text-center">
            <p className="text-sm opacity-90 mb-2">{t('businessDashboard.dashboard.capacityLeft')}</p>
            <p className="text-2xl md:text-3xl font-bold">{businessData?.queueSettings?.[0]?.maxPatientsPerDay ? businessData.queueSettings[0].maxPatientsPerDay - stats.todaysPatients : '-'}</p>
          </div>
        </div>
      </div>

      {/* Patient Queue */}
      <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 mb-8 transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            👥 {t('businessDashboard.dashboard.patientQueue')}
          </h2>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 py-2 rounded-lg font-semibold bg-[#359487]/10 text-[#359487] border-2 border-[#359487] dark:text-[#C6FE02] dark:border-[#C6FE02] dark:bg-[#C6FE02]/10 transition-all">
              {t('businessDashboard.dashboard.all')} ({tickets.length})
            </button>
            <button className="flex-1 md:flex-none px-4 py-2 rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
              {t('businessDashboard.dashboard.waitingCount')} ({waitingTickets.length})
            </button>
            <button className="flex-1 md:flex-none px-4 py-2 rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
              {t('businessDashboard.dashboard.called')} ({servingTickets.length})
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-5xl mb-3 block">📋</span>
              <p className="text-gray-500 dark:text-gray-400">{t('businessDashboard.queueManagement.noWaitingTickets')}</p>
            </div>
          ) : (
            <>
              {/* Serving Tickets */}
              {servingTickets.map((ticket) => (
                <div key={ticket._id} className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-4 rounded-xl border-2 border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-500/50">
                  <div className="flex items-center gap-4 md:contents">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-lg bg-green-500 text-white flex-shrink-0">
                      #{ticket.number}
                    </div>
                    <div className="md:hidden flex-1">
                      <h4 className="font-bold text-gray-800 dark:text-white mb-1">{ticket.userId?.name || t('businessDashboard.queueManagement.guest')}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {ticket.userId?.phone && `📞 ${ticket.userId.phone}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-1">{ticket.userId?.name || t('businessDashboard.queueManagement.guest')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {ticket.userId?.phone && `📞 ${ticket.userId.phone}`}
                    </p>
                  </div>

                  <div className="flex justify-between items-center md:block md:text-right">
                    <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300 md:mb-2">
                      ⏰ {t('businessDashboard.dashboard.inProgress')}
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                      {new Date(ticket.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => handleCompleteTicket(ticket._id)}
                      className="w-10 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                      ✓
                    </button>
                  </div>
                </div>
              ))}

              {/* Waiting Tickets */}
              {waitingTickets.map((ticket, index) => (
                <div key={ticket._id} className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-[#359487] dark:hover:border-[#C6FE02] hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                  <div className="flex items-center gap-4 md:contents">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-lg bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black flex-shrink-0">
                      #{ticket.number}
                    </div>
                    <div className="md:hidden flex-1">
                      <h4 className="font-bold text-gray-800 dark:text-white mb-1">{ticket.userId?.name || t('businessDashboard.queueManagement.guest')}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {ticket.userId?.phone && `📞 ${ticket.userId.phone}`}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-1">{ticket.userId?.name || t('businessDashboard.queueManagement.guest')}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {ticket.userId?.phone && `📞 ${ticket.userId.phone}`}
                    </p>
                  </div>

                  <div className="flex justify-between items-center md:block md:text-right">
                    <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300 md:mb-2">
                      ⏰ {t('businessDashboard.dashboard.estimated')} {(index + 1) * stats.avgWaitTime || 5} {t('businessDashboard.dashboard.minutes')}
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                      {new Date(ticket.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => handleCallTicket(ticket._id)}
                      className="w-10 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                      📢
                    </button>
                    <button 
                      onClick={() => handleSkipTicket(ticket._id)}
                      className="w-10 h-10 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center">
                      ⏭️
                    </button>
                    <button 
                      onClick={() => handleCancelTicket(ticket._id)}
                      className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center">
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

        </div>
      </div>
    </>
  );
}

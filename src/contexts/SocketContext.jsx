"use client";

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import io from 'socket.io-client';

const SocketContext = createContext(null);

// Singleton socket instance to prevent multiple connections
let socketInstance = null;

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const isInitialized = useRef(false);
  
  // Initialize socket with singleton pattern
  const [socket] = useState(() => {
    if (typeof window === 'undefined') return null;
    
    if (!socketInstance) {
      console.log('🔌 Creating new socket instance');
      socketInstance = io('http://localhost:5000', {
        withCredentials: true,
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });
    } else {
      console.log('♻️ Reusing existing socket instance');
    }
    
    return socketInstance;
  });

  useEffect(() => {
    if (!socket || isInitialized.current) return;
    
    console.log('🎬 Initializing socket listeners');
    isInitialized.current = true;

    socket.on('connect', () => {
      console.log('✅ Socket.IO Connected - ID:', socket.id);
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket.IO Disconnected');
      setConnected(false);
    });

    socket.on('reconnect', () => {
      console.log('🔄 Socket.IO Reconnected');
      setConnected(true);
    });

    // ticketCreated - When a new ticket is booked (per documentation)
    socket.on('ticketCreated', (data) => {
      console.log('🎟️ Ticket Created:', data);
      const notification = {
        id: Date.now(),
        type: 'ticket',
        message: `Ticket #${data.number} created successfully`,
        data: data,
        timestamp: new Date(),
      };
      setNotifications(prev => [notification, ...prev].slice(0, 50));
      
      toast.success(`Ticket #${data.number} booked!`, {
        icon: '🎟️',
        duration: 5000,
      });
    });

    // ticketUpdated - Queue position or status changes (per documentation)
    socket.on('ticketUpdated', (data) => {
      console.log('🔄 Ticket Updated:', data);
      const notification = {
        id: Date.now(),
        type: 'ticket',
        message: `Ticket #${data.number} - ${data.status}`,
        data: data,
        timestamp: new Date(),
      };
      setNotifications(prev => [notification, ...prev].slice(0, 50));
    });

    // Queue update notifications
    socket.on('queueUpdate', (data) => {
      console.log('📢 Queue Update:', data);
      const notification = {
        id: Date.now(),
        type: 'queue',
        message: data.message,
        data: data,
        timestamp: new Date(),
      };
      setNotifications(prev => [notification, ...prev].slice(0, 50));
      
      toast(data.message, {
        icon: '🎟️',
        duration: 5000,
      });
    });

    // Position update notifications
    socket.on('positionUpdate', (data) => {
      console.log('📍 Position Update:', data);
      const notification = {
        id: Date.now(),
        type: 'position',
        message: `Your position: #${data.position}. Estimated wait: ${data.estimatedWait} min`,
        data: data,
        timestamp: new Date(),
      };
      setNotifications(prev => [notification, ...prev].slice(0, 50));
      
      toast(`Your position: #${data.position}`, {
        icon: '📍',
        duration: 4000,
      });
    });

    // Turn notification (your turn!)
    socket.on('yourTurn', (data) => {
      console.log('🔔 Your Turn:', data);
      const notification = {
        id: Date.now(),
        type: 'turn',
        message: "It's your turn! Please proceed to the counter.",
        data: data,
        timestamp: new Date(),
      };
      setNotifications(prev => [notification, ...prev].slice(0, 50));
      
      toast("🎉 It's your turn! Please proceed.", {
        icon: '🔔',
        duration: 10000,
        style: {
          background: '#359487',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      });

      // Play notification sound
      if (typeof window !== 'undefined' && window.Audio) {
        const audio = new Audio('/notification.mp3');
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
    });

    // Appointment reminders
    socket.on('appointmentReminder', (data) => {
      console.log('⏰ Appointment Reminder:', data);
      const notification = {
        id: Date.now(),
        type: 'reminder',
        message: `Reminder: Appointment in ${data.timeUntil}`,
        data: data,
        timestamp: new Date(),
      };
      setNotifications(prev => [notification, ...prev].slice(0, 50));
      
      toast(`⏰ Appointment in ${data.timeUntil}`, {
        duration: 8000,
      });
    });

    // Payment notifications
    socket.on('paymentUpdate', (data) => {
      console.log('💳 Payment Update:', data);
      const notification = {
        id: Date.now(),
        type: 'payment',
        message: data.message,
        data: data,
        timestamp: new Date(),
      };
      setNotifications(prev => [notification, ...prev].slice(0, 50));
      
      const icon = data.status === 'success' ? '✅' : data.status === 'failed' ? '❌' : '💳';
      toast(data.message, {
        icon: icon,
        duration: 6000,
      });
    });

    return () => {
      // Don't cleanup on re-render, listeners are initialized once
    };
  }, [socket]);

  const joinQueue = (queueId) => {
    if (socket) {
      socket.emit('joinQueue', queueId);
    }
  };

  const leaveQueue = (queueId) => {
    if (socket) {
      socket.emit('leaveQueue', queueId);
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Cleanup on component unmount - disconnect and clear singleton
  useEffect(() => {
    return () => {
      if (socket && socketInstance) {
        console.log('🔌 Disconnecting socket on SocketProvider unmount');
        socket.disconnect();
        socketInstance = null;
        isInitialized.current = false;
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        notifications,
        joinQueue,
        leaveQueue,
        clearNotifications,
        removeNotification,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

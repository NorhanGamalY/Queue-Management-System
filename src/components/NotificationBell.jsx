"use client";

import { useSocket } from '@/contexts/SocketContext';
import { Bell, Clock, CreditCard, MapPin, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function NotificationBell() {
  const { notifications, removeNotification, clearNotifications } = useSocket();
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setUnreadCount(notifications.length);
  }, [notifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'queue':
        return <MapPin size={18} className="text-blue-500" />;
      case 'position':
        return <MapPin size={18} className="text-purple-500" />;
      case 'turn':
        return <Bell size={18} className="text-green-500" />;
      case 'reminder':
        return <Clock size={18} className="text-orange-500" />;
      case 'payment':
        return <CreditCard size={18} className="text-pink-500" />;
      default:
        return <Bell size={18} className="text-gray-500" />;
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000); // seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return time.toLocaleDateString();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Notifications"
      >
        <Bell size={22} className="text-gray-700 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-96 max-h-[500px] bg-white dark:bg-[#2b2825] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white">
                  Notifications
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {unreadCount} new
                </p>
              </div>
              {notifications.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearNotifications();
                  }}
                  className="text-xs text-[#359487] dark:text-[#C6FE02] hover:underline font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No notifications yet
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    You'll be notified about queue updates
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group relative"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        <X size={14} className="text-gray-500 dark:text-gray-400" />
                      </button>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800 dark:text-white font-medium mb-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#221F1B]">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-sm text-[#359487] dark:text-[#C6FE02] hover:underline font-medium"
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

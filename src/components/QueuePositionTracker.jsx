"use client";

import { useSocket } from '@/contexts/SocketContext';
import { Clock, MapPin, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function QueuePositionTracker({ ticketId, queueId }) {
  const { socket, connected } = useSocket();
  const [queueData, setQueueData] = useState({
    position: null,
    totalInQueue: 0,
    estimatedWait: 0,
    currentServing: null,
    status: 'waiting',
  });

  useEffect(() => {
    if (!socket || !ticketId || !queueId) return;

    // Join the queue room
    socket.emit('joinQueue', { queueId, ticketId });

    // Listen for position updates
    socket.on('positionUpdate', (data) => {
      if (data.ticketId === ticketId) {
        setQueueData(prev => ({
          ...prev,
          position: data.position,
          totalInQueue: data.totalInQueue,
          estimatedWait: data.estimatedWait,
        }));
      }
    });

    // Listen for queue status
    socket.on('queueStatus', (data) => {
      if (data.queueId === queueId) {
        setQueueData(prev => ({
          ...prev,
          currentServing: data.currentServing,
          totalInQueue: data.totalInQueue,
        }));
      }
    });

    // Listen for your turn
    socket.on('yourTurn', (data) => {
      if (data.ticketId === ticketId) {
        setQueueData(prev => ({
          ...prev,
          status: 'ready',
          position: 0,
        }));
      }
    });

    return () => {
      socket.emit('leaveQueue', { queueId, ticketId });
      socket.off('positionUpdate');
      socket.off('queueStatus');
      socket.off('yourTurn');
    };
  }, [socket, ticketId, queueId]);

  if (!ticketId || !queueId) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 text-center">
        <p className="text-yellow-700 dark:text-yellow-300">No active ticket found</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-lg p-6 space-y-6 border border-gray-100 dark:border-gray-700">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          Queue Status
        </h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {connected ? 'Live' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Your Position - Main Display */}
      {queueData.status === 'ready' ? (
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-center animate-pulse">
          <div className="text-white text-5xl font-bold mb-2">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-2">It's Your Turn!</h2>
          <p className="text-green-100 text-lg">Please proceed to the counter</p>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-[#359487] to-[#2a7569] dark:from-[#C6FE02] dark:to-[#a8d902] rounded-2xl p-8 text-center">
          <p className="text-white dark:text-black text-sm font-medium mb-2 opacity-90">
            Your Position
          </p>
          <div className="text-white dark:text-black text-6xl font-bold mb-2">
            #{queueData.position || '...'}
          </div>
          <p className="text-white dark:text-black text-sm opacity-90">
            in the queue
          </p>
        </div>
      )}

      {/* Queue Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Estimated Wait Time */}
        <div className="bg-gray-50 dark:bg-[#221F1B] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-[#359487] dark:text-[#C6FE02]" size={20} />
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              Est. Wait
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {queueData.estimatedWait || 0}
            <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-1">
              min
            </span>
          </p>
        </div>

        {/* People in Queue */}
        <div className="bg-gray-50 dark:bg-[#221F1B] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-[#359487] dark:text-[#C6FE02]" size={20} />
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              In Queue
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {queueData.totalInQueue || 0}
          </p>
        </div>
      </div>

      {/* Currently Serving */}
      {queueData.currentServing && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-blue-600 dark:text-blue-400" size={18} />
            <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
              Now Serving
            </span>
          </div>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            #{queueData.currentServing}
          </p>
        </div>
      )}

      {/* Progress Visualization */}
      {queueData.position && queueData.totalInQueue > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Progress</span>
            <span>
              {Math.round(((queueData.totalInQueue - queueData.position) / queueData.totalInQueue) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#359487] to-[#2a7569] dark:from-[#C6FE02] dark:to-[#a8d902] h-3 rounded-full transition-all duration-500"
              style={{
                width: `${((queueData.totalInQueue - queueData.position) / queueData.totalInQueue) * 100}%`
              }}
            />
          </div>
        </div>
      )}

      {/* Live Queue Map */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="text-[#359487] dark:text-[#C6FE02]" size={18} />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Queue Map
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {queueData.position && Array.from({ length: Math.min(queueData.totalInQueue, 10) }, (_, i) => {
            const pos = i + 1;
            const isYou = pos === queueData.position;
            const isPassed = pos < queueData.position;
            const isCurrent = pos === (queueData.currentServing || 0);

            return (
              <div
                key={i}
                className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-blue-500 text-white ring-2 ring-blue-300 scale-110'
                    : isYou
                    ? 'bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black ring-2 ring-[#359487] dark:ring-[#C6FE02] scale-110 animate-pulse'
                    : isPassed
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 opacity-50'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                {pos}
              </div>
            );
          })}
          {queueData.totalInQueue > 10 && (
            <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
              +{queueData.totalInQueue - 10}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

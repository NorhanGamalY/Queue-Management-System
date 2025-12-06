"use client";

import { useTranslations } from '@/hooks/useTranslations';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ReviewsTab({ businessId }) {
  const { t } = useTranslations();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    averageRating: 0,
    fiveStars: 0,
    fourStars: 0,
    threeStars: 0,
    twoStars: 0,
    oneStar: 0
  });

  useEffect(() => {
    const fetchReviews = async () => {
      if (!businessId) return;
      try {
        const response = await fetch(`http://localhost:5000/api/v1/reviews/businesses/${businessId}/reviews`, {
          credentials: 'include',
        });
        if (response.ok) {
          const result = await response.json();
          const reviewsData = result.reviews || [];
          setReviews(reviewsData);

          // Calculate stats
          const total = reviewsData.length;
          const avgRating = total > 0 
            ? reviewsData.reduce((sum, r) => sum + r.rating, 0) / total 
            : 0;
          
          setStats({
            total,
            averageRating: avgRating,
            fiveStars: reviewsData.filter(r => r.rating === 5).length,
            fourStars: reviewsData.filter(r => r.rating === 4).length,
            threeStars: reviewsData.filter(r => r.rating === 3).length,
            twoStars: reviewsData.filter(r => r.rating === 2).length,
            oneStar: reviewsData.filter(r => r.rating === 1).length
          });
        }
      } catch (error) {
        toast.error('Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();

    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchReviews, 10000);
    return () => clearInterval(interval);
  }, [businessId]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#2b2825] rounded-2xl p-8 shadow-sm">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#359487] dark:border-[#C6FE02] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Customer Reviews
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Feedback and ratings from your customers
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl shadow-lg p-6 col-span-1 md:col-span-3 lg:col-span-1">
          <div className="text-center">
            <p className="text-sm opacity-90 mb-2">Average Rating</p>
            <p className="text-5xl font-bold mb-2">{stats.averageRating.toFixed(1)}</p>
            <div className="flex items-center justify-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl">
                  {i < Math.round(stats.averageRating) ? '⭐' : '☆'}
                </span>
              ))}
            </div>
            <p className="text-sm opacity-90">Based on {stats.total} reviews</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#2b2825] rounded-xl shadow-sm p-6 col-span-1 md:col-span-3 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Rating Distribution</h3>
          <div className="space-y-2">
            {[
              { stars: 5, count: stats.fiveStars, color: 'bg-green-500' },
              { stars: 4, count: stats.fourStars, color: 'bg-lime-500' },
              { stars: 3, count: stats.threeStars, color: 'bg-yellow-500' },
              { stars: 2, count: stats.twoStars, color: 'bg-orange-500' },
              { stars: 1, count: stats.oneStar, color: 'bg-red-500' }
            ].map(({ stars, count, color }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-12">
                  {stars} ⭐
                </span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`${color} h-3 rounded-full transition-all`}
                    style={{ width: `${stats.total > 0 ? (count / stats.total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="bg-white dark:bg-[#2b2825] rounded-2xl p-8 shadow-sm">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">⭐</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Reviews from customers will appear here
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white dark:bg-[#2b2825] rounded-2xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700 hover:border-[#359487] dark:hover:border-[#C6FE02] transition-colors">
              {/* Customer Info & Date */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {review.userId?.name || 'Anonymous Customer'}
                  </h3>
                  {review.ticketId && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ticket #{review.ticketId?.ticketNumber || review.ticketId}
                    </p>
                  )}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>

              {/* Rating Display */}
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-2xl">
                        {i < review.rating ? '⭐' : '☆'}
                      </span>
                    ))}
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">{review.rating}</p>
                    <p className="text-sm opacity-90">out of 5</p>
                  </div>
                </div>
              </div>

              {/* Review Comment */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4 border-l-4 border-blue-500">
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">💬 Customer Feedback</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {review.comment || 'No comment provided'}
                </p>
              </div>

              {/* Review Details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">🕐 Posted At</span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {new Date(review.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              {/* Customer Contact Info */}
              {review.userId && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-4 border-l-4 border-[#359487] dark:border-[#C6FE02]">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">👤 Customer Information</p>
                  {review.userId.email && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">✉️ {review.userId.email}</p>
                  )}
                  {review.userId.phone && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">📞 {review.userId.phone}</p>
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

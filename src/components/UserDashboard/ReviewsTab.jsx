"use client";

export default function ReviewsTab({ t, myReviews, loadingReviews }) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {t('userDashboard.reviews.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('userDashboard.reviews.subtitle')}
        </p>
      </div>

      {loadingReviews ? (
        <div className="bg-white dark:bg-[#2b2825] rounded-2xl p-8 shadow-sm">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#359487] dark:border-[#C6FE02] mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading reviews...</p>
          </div>
        </div>
      ) : myReviews.length === 0 ? (
        <div className="bg-white dark:bg-[#2b2825] rounded-2xl p-8 shadow-sm">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">⭐</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {t('userDashboard.reviews.noReviews')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('userDashboard.reviews.subtitle')}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {myReviews.map((review) => (
            <div key={review._id} className="bg-white dark:bg-[#2b2825] rounded-2xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700 hover:border-[#359487] dark:hover:border-[#C6FE02] transition-colors">
              {/* Business Name & Date */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {review.businessId?.name || 'Business'}
                  </h3>
                  {review.businessId?.category && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {review.businessId.category}
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
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">💬 Your Review</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {review.comment || 'No comment provided'}
                </p>
              </div>

              {/* Review Details */}
              <div className="space-y-2">
                {review.ticketId && (
                  <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">🎫 Ticket</span>
                    <span className="font-semibold text-[#359487] dark:text-[#C6FE02]">
                      #{review.ticketId?.ticketNumber || review.ticketId}
                    </span>
                  </div>
                )}
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

              {/* Business Contact Info */}
              {review.businessId && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-4 border-l-4 border-[#359487] dark:border-[#C6FE02]">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">🏪 Business Information</p>
                  {review.businessId.address && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">📍 {review.businessId.address}</p>
                  )}
                  {review.businessId.phone && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">📞 {review.businessId.phone}</p>
                  )}
                  {review.businessId.email && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">✉️ {review.businessId.email}</p>
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

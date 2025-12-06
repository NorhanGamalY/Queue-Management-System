"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import BookingModal from '../BookingModal';

export default function FindBusinessTab({ t, searchResults, isSearching, searchQuery, setSearchQuery, handleSearch }) {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBookClick = (business) => {
    setSelectedBusiness(business);
  };

  const handleCheckout = async () => {
    if (!selectedBusiness) return;
    
    setIsProcessing(true);
    try {
      // First, fetch the queue for this business
      const queueResponse = await fetch(`http://localhost:5000/api/v1/queues/business/${selectedBusiness._id}/queue`, {
        credentials: 'include',
      });

      if (!queueResponse.ok) {
        toast.error('Business queue not available');
        setIsProcessing(false);
        return;
      }

      const queueData = await queueResponse.json();
      const queueId = queueData.data?._id;

      if (!queueId) {
        toast.error('Queue not found for this business');
        setIsProcessing(false);
        return;
      }

      // Store booking details in session storage for payment page
      sessionStorage.setItem('pendingBooking', JSON.stringify({
        businessId: selectedBusiness._id,
        businessName: selectedBusiness.name,
        queueId,
        type: 'examination',
        priority: 'normal'
      }));

      // Redirect to payment page
      window.location.href = '/payment';
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error('Failed to proceed to checkout');
      setIsProcessing(false);
    }
  };
  return (
    <>
      {/* Booking Modal */}
      {selectedBusiness && (
        <BookingModal
          business={selectedBusiness}
          onClose={() => setSelectedBusiness(null)}
          onCheckout={handleCheckout}
          isProcessing={isProcessing}
        />
      )}
      
      <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 mb-8 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <FaSearch /> {t('clinics.title')}
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder={t('clinics.searchPlaceholder')}
          className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#359487] dark:focus:border-[#C6FE02] focus:outline-none transition-colors bg-transparent dark:text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch}
          disabled={isSearching}
          className="bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black px-8 py-3 rounded-xl font-semibold hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors disabled:opacity-50"
        >
          {isSearching ? t('common.searching') : t('common.search')}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.length > 0 ? (
          searchResults.map((clinic) => (
            <div key={clinic._id} className="border-2 border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:border-[#359487] dark:hover:border-[#C6FE02] hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">{clinic.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{clinic.specialization || "General Practice"}</p>
                </div>
              </div>
              <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4 pt-4 border-t dark:border-gray-600">
                <span>⭐ {clinic.rating || "N/A"}</span>
                <span>📍 {clinic.address}</span>
                <span>⏰ {clinic.isOpen ? "Open" : "Closed"}</span>
              </div>
              <button 
                onClick={() => handleBookClick(clinic)}
                className="w-full bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black py-2 rounded-lg font-semibold hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors"
              >
                Book Ticket
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
            {searchQuery ? t('clinics.noBusinessesFound') : t('userDashboard.searchPlaceholder')}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

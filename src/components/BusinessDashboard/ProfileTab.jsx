"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete, MdEdit, MdSave } from 'react-icons/md';
import BusinessProfilePhoto from '../BusinessProfilePhoto';

export default function ProfileTab({ businessData, isDisabled, handleEditProfile, handleDeleteAccount, handleSaveEdit, refreshBusinessData }) {
  const { t } = useTranslations();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobilePhone: '',
    landlinePhone: '',
    address: '',
    paymentMethod: '',
    specialization: ''
  });

  // Initialize form data when businessData changes
  useEffect(() => {
    if (businessData) {
      setFormData({
        name: businessData.name || '',
        email: businessData.email || '',
        mobilePhone: businessData.mobilePhone || '',
        landlinePhone: businessData.landlinePhone || '',
        address: businessData.address || '',
        paymentMethod: businessData.paymentMethod || '',
        specialization: businessData.specialization || ''
      });
    }
  }, [businessData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/businesses/${businessData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      toast.success('Profile updated successfully!');
      handleSaveEdit(); // This will disable the form
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };
  return (
    <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 md:p-8 transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          👤 {t('businessDashboard.profile.title')}
        </h2>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {isDisabled ? (
            <button onClick={handleEditProfile} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors">
              <MdEdit size={20} /> {t('businessDashboard.profile.editProfile')}
            </button>
          ) : (
            <button onClick={handleSave} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors">
              <MdSave size={20} /> {t('businessDashboard.profile.saveChanges')}
            </button>
          )}
          <button onClick={handleDeleteAccount} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-6 py-3 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
            <MdDelete size={20} /> {t('businessDashboard.profile.deleteAccount')}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center mb-8">
        <BusinessProfilePhoto businessData={businessData} isDisabled={isDisabled} onPhotoUpdated={refreshBusinessData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            🏥 {t('businessDashboard.profile.businessName')}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none focus:border-[#359487] dark:focus:border-[#C6FE02] transition-colors"
            disabled={isDisabled}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            📧 {t('businessDashboard.profile.email')}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none focus:border-[#359487] dark:focus:border-[#C6FE02] transition-colors"
            disabled={isDisabled}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            📱 {t('businessDashboard.profile.mobilePhone')}
          </label>
          <input
            type="tel"
            name="mobilePhone"
            value={formData.mobilePhone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none focus:border-[#359487] dark:focus:border-[#C6FE02] transition-colors"
            disabled={isDisabled}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            ☎️ {t('businessDashboard.profile.landlinePhone')}
          </label>
          <input
            type="tel"
            name="landlinePhone"
            value={formData.landlinePhone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none focus:border-[#359487] dark:focus:border-[#C6FE02] transition-colors"
            disabled={isDisabled}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            📍 {t('businessDashboard.profile.address')}
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none focus:border-[#359487] dark:focus:border-[#C6FE02] transition-colors"
            disabled={isDisabled}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            💳 {t('businessDashboard.profile.paymentMethod')}
          </label>
          <input
            type="text"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none focus:border-[#359487] dark:focus:border-[#C6FE02] transition-colors capitalize"
            disabled={isDisabled}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            🏥 {t('businessDashboard.profile.specialization')}
          </label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none focus:border-[#359487] dark:focus:border-[#C6FE02] transition-colors"
            disabled={isDisabled}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            ⏰ Working Time
          </label>
          <div className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white">
            {businessData?.workingHours && businessData.workingHours.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {businessData.workingHours.map((wh, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white dark:bg-black/20 rounded-lg">
                    <span className="font-medium capitalize">{wh.days}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {wh.isClosed ? 'Closed' : `${wh.openTime} - ${wh.closeTime}`}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Not specified</p>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            🛠️ Services
          </label>
          <div className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white">
            {businessData?.service && businessData.service.length > 0 ? (
              <div className="space-y-3">
                {businessData.service.map((svc, index) => (
                  <div key={index} className="p-3 bg-white dark:bg-black/20 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold">{svc.name}</h4>
                      <span className="bg-[#359487]/10 text-[#359487] dark:text-[#C6FE02] dark:bg-[#C6FE02]/10 px-2 py-0.5 rounded text-sm font-medium">
                        {svc.price} EGP
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{svc.description}</p>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <span>⏱️ {svc.duration} mins</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No services listed</p>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            ⚙️ {t('businessDashboard.profile.queueSettings')}
          </label>
          <div className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white">
            {businessData?.queueSettings && businessData.queueSettings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-white dark:bg-black/20 rounded-lg flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Max Clients per Day</span>
                  <span className="font-bold">{businessData.queueSettings[0].maxPatientsPerDay}</span>
                </div>
                <div className="p-3 bg-white dark:bg-black/20 rounded-lg flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Last Appointment</span>
                  <span className="font-bold">{businessData.queueSettings[0].LastTimeToAppoint}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">{t('businessDashboard.profile.noQueueSettings')}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            ✅ Account Status
          </label>
          <input
            type="text"
            value={businessData?.status || 'active'}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none capitalize"
            disabled={isDisabled}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            ⭐ Rating
          </label>
          <input
            type="text"
            value={businessData?.rating ? `${businessData.rating} / 5` : 'No ratings yet'}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none"
            disabled={isDisabled}
          />
        </div>
      </div>
      {isDisabled === false && (
        <div className="flex justify-end">
          <button
            onClick={handleSaveEdit}
            className="mt-5 w-1/4 flex items-center justify-center gap-2 bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors"
          >
            <span><MdSave size={22}/></span>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

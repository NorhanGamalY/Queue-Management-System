"use client";

import UserProfilePhoto from '@/components/UserProfilePhoto';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaPhone, FaUser } from 'react-icons/fa';
import { MdAccountBalance, MdCheck, MdDelete, MdEdit, MdEmail, MdSave } from 'react-icons/md';

export default function MyProfileTab({ 
  t, 
  userData, 
  isDisabled, 
  handleEditProfile, 
  handleDeleteAccount,
  handleSaveEdit,
  refreshUserData 
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    isEmailVerified: false
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        type: userData.type || 'customer',
        isEmailVerified: userData.isEmailVerified || false
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Profile updated successfully');
        if (refreshUserData) {
          await refreshUserData();
        }
        handleSaveEdit(); // Exit edit mode
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {t('userDashboard.tabs.profile')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your profile information
        </p>
      </div>

      <div className="bg-white dark:bg-[#2b2825] rounded-2xl p-8 shadow-sm">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <UserProfilePhoto 
            userData={userData} 
            isDisabled={isDisabled}
            onPhotoUpdated={refreshUserData}
          />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
            {userData?.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{userData?.email}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mb-6">
          {isDisabled ? (
            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 px-4 py-2 bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black rounded-xl font-semibold hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors"
            >
              <MdEdit size={20} />
              {t('userDashboard.editProfile')}
            </button>
          ) : null}
          <button
            onClick={handleDeleteAccount}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
          >
            <MdDelete size={20} />
            {t('userDashboard.deleteAccount')}
          </button>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <FaUser />
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none focus:border-[#359487] dark:focus:border-[#C6FE02]"
              disabled={isDisabled}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <MdEmail />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none"
              disabled={true}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <FaPhone />
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none"
              disabled={isDisabled}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <MdAccountBalance />
              Account Type
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none capitalize"
              disabled={true}
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <MdCheck size={22} color="green" />
              Email Verified
            </label>
            <input
              type="text"
              value={formData.isEmailVerified ? 'Verified' : 'Not Verified'}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-[#221F1B] text-gray-800 dark:text-white focus:outline-none"
              disabled={true}
            />
          </div>
        </div>

        {!isDisabled && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#2a8074] dark:hover:bg-[#a7d404] transition-colors"
            >
              <MdSave size={22} />
              {t('userDashboard.saveChanges')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCamera, FaUser } from 'react-icons/fa';

export default function UserProfilePhoto({ userData, isDisabled = true, onPhotoUpdated }) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(userData?.profileImage || null);
  const fileInputRef = useRef(null);

  // Sync imageUrl when userData changes
  useEffect(() => {
    if (userData?.profileImage) {
      setImageUrl(userData.profileImage);
    }
  }, [userData?.profileImage]);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await fetch('http://localhost:5000/api/v1/users/upload-profile-photo', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }

      const data = await response.json();
      toast.success('Profile photo updated successfully');
      
      // Update the image URL locally
      if (data.data?.profileImage) {
        setImageUrl(data.data.profileImage);
      }

      // Refresh parent user data
      if (onPhotoUpdated) {
        onPhotoUpdated();
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const profileImageUrl = imageUrl 
    ? `http://localhost:5000${imageUrl}`
    : null;

  return (
    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#359487] dark:border-[#C6FE02] bg-gradient-to-br from-[#359487] to-[#2a8074] dark:from-[#C6FE02] dark:to-[#a7d404]">
      {profileImageUrl ? (
        <img
          src={profileImageUrl}
          alt={userData?.name || 'User'}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white dark:text-black text-4xl font-bold">
          {userData?.name?.charAt(0).toUpperCase() || <FaUser size={48} />}
        </div>
      )}
      
      {/* Upload button overlay - only show when editing is enabled */}
      {!isDisabled && (
        <>
          <label
            htmlFor="user-photo-upload"
            className={`absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all ${uploading ? 'cursor-wait' : 'cursor-pointer'} flex items-center justify-center group`}
          >
            {uploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            ) : (
              <FaCamera className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
            )}
          </label>

          <input
            ref={fileInputRef}
            id="user-photo-upload"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
        </>
      )}
    </div>
  );
}

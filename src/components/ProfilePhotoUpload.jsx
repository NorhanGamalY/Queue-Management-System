"use client";

import Image from 'next/image';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCamera, FaTrash } from 'react-icons/fa';

export default function ProfilePhotoUpload({ currentImage, onImageChange, size = "large" }) {
  const [preview, setPreview] = useState(currentImage || null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
    xlarge: "w-40 h-40"
  };

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

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Pass the file to parent component
    if (onImageChange) {
      onImageChange(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onImageChange) {
      onImageChange(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800`}>
        {preview ? (
          <Image
            src={preview}
            alt="Profile"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <FaCamera size={size === "small" ? 24 : size === "medium" ? 32 : 48} />
          </div>
        )}
        
        {/* Upload button overlay */}
        <label
          htmlFor="photo-upload"
          className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all cursor-pointer flex items-center justify-center group"
        >
          <FaCamera className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
        </label>
      </div>

      <input
        ref={fileInputRef}
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black rounded-lg hover:opacity-90 transition-all text-sm font-medium"
        >
          Choose Photo
        </button>
        
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium flex items-center gap-2"
          >
            <FaTrash size={14} />
            Remove
          </button>
        )}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        JPG, PNG, GIF up to 5MB
      </p>
    </div>
  );
}

"use client";
import FormField from '@/components/BusinessRegister/FormField';
import QueueSettingsSection from '@/components/BusinessRegister/QueueSettingsSection';
import ServiceSection from '@/components/BusinessRegister/ServiceSection';
import WorkingTimeSection from '@/components/BusinessRegister/WorkingTimeSection';
import ProfilePhotoUpload from '@/components/ProfilePhotoUpload';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from '@/hooks/useTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaBriefcase, FaCreditCard, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export default function Page() {
  const router = useRouter();
  const { t } = useTranslations();
  const API = 'http://localhost:5000/api/v1/auth/register-business';
  
  const [business, setBusiness] = useState({
    name: '',
    email: '',
    password: '',
    mobilePhone: '',
    landlinePhone: '',
    address: '',
    paymentMethod: [],
    specialization: '',
    profileImage: '',
    businessImages: '',
    workingHours: { days: [], openTime: '', closeTime: ''},
    service: { name: '', description: '', price: '', duration: ''},
    queueSettings: { maxPatientsPerDay: '', lastTimeToAppoint: ''}
  });

  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle working hours nested fields
    if (name === 'openTime' || name === 'closeTime') {
      setBusiness({
        ...business,
        workingHours: { ...business.workingHours, [name]: value }
      });
    }
    // Handle service nested fields
    else if (name === 'serviceName' || name === 'serviceDescription' || name === 'servicePrice' || name === 'serviceDuration') {
      const fieldName = name.replace('service', '').charAt(0).toLowerCase() + name.replace('service', '').slice(1);
      setBusiness({
        ...business,
        service: { ...business.service, [fieldName]: value }
      });
    }
    // Handle queue settings nested fields
    else if (name === 'maxPatientsPerDay' || name === 'lastAppointmentTime') {
      const fieldName = name === 'lastAppointmentTime' ? 'lastTimeToAppoint' : name;
      setBusiness({
        ...business,
        queueSettings: { ...business.queueSettings, [fieldName]: value }
      });
    }
    // Handle regular fields
    else {
      setBusiness({...business, [name]: value});
    }
  };

  // Handle checkbox for working days
  const handleDayChange = (day) => {
    const currentDays = business.workingHours.days;
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    
    setBusiness({
      ...business,
      workingHours: { ...business.workingHours, days: newDays }
    });
  };

  // Handle payment method checkbox
  const handlePaymentMethodChange = (method) => {
    const currentMethods = business.paymentMethod;
    const newMethods = currentMethods.includes(method)
      ? currentMethods.filter(m => m !== method)
      : [...currentMethods, method];
    
    setBusiness({
      ...business,
      paymentMethod: newMethods
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const businessData = {
        name: business.name,
        email: business.email,
        password: business.password,
        mobilePhone: business.mobilePhone,
        landlinePhone: business.landlinePhone,
        address: business.address,
        paymentMethod: business.paymentMethod.length > 0 ? business.paymentMethod[0] : 'cash',
      };

      // Add optional fields
      if (business.specialization) businessData.specialization = business.specialization;
      if (business.profileImage) businessData.profileImage = business.profileImage;
      if (business.businessImages) {
        businessData.businessImages = business.businessImages.split(',').map(url => url.trim());
      }

      // Format workingHours as array (schema expects array)
      if (business.workingHours && business.workingHours.days.length > 0) {
        businessData.workingHours = business.workingHours.days.map(day => ({
          days: day,
          openTime: business.workingHours.openTime,
          closeTime: business.workingHours.closeTime,
          isClosed: false
        }));
      }

      // Format service as array (schema expects array)
      if (business.service && business.service.name) {
        businessData.service = [{
          name: business.service.name,
          description: business.service.description,
          price: parseFloat(business.service.price) || 0,
          duration: parseInt(business.service.duration) || 0
        }];
      }

      // Format queueSettings as array (schema expects array)
      if (business.queueSettings && business.queueSettings.maxPatientsPerDay) {
        businessData.queueSettings = [{
          maxPatientsPerDay: parseInt(business.queueSettings.maxPatientsPerDay),
          LastTimeToAppoint: business.queueSettings.lastTimeToAppoint
        }];
      }

      console.log('Sending business data:', businessData);

      const res = await fetch(API, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(businessData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to register business");
      }

      console.log('Business registered:', data);

      // Upload profile photo if selected
      if (profilePhotoFile) {
        try {
          const formData = new FormData();
          formData.append('profileImage', profilePhotoFile);

          const uploadRes = await fetch('http://localhost:5000/api/v1/businesses/upload-profile-photo', {
            method: 'POST',
            credentials: 'include',
            body: formData,
          });

          if (uploadRes.ok) {
            toast.success('Profile photo uploaded successfully');
          }
        } catch (uploadErr) {
          console.error('Photo upload error:', uploadErr);
          toast.error('Business registered but photo upload failed');
        }
      }

      toast.success('Business registered successfully!');
      router.push('/business');
    } catch (err) {
      setError(err.message);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-[#221F1B]">

      <div className="relative w-full h-full bg-[#287b70] py-15 md:py-0 dark:bg-black md:flex justify-center hidden md:block">
        <Image
        width={500}
        height={500}
          src="/register8.png"
          className="object-contain w-9/12"
          alt="Business Register"
        />
      </div>

      <div className="flex flex-col justify-start px-10 py-12 text-center md:text-left bg-white xl:w-2/3 w-full mx-auto dark:bg-[#221F1B] overflow-y-auto max-h-screen">

        <p className="text-3xl font-bold mb-2 text-[#29b7a4] text-center">{t('register.business.title')}</p>
        <span className="block mb-8 text-gray-500 text-center dark:text-white">{t('register.business.subtitle')}</span>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          {/* Profile Photo Upload */}
          <div className="mb-6">
            <Label className="text-base font-semibold mb-3 block text-center">Profile Photo</Label>
            <ProfilePhotoUpload
              currentImage={business.profileImage}
              onImageChange={(file) => setProfilePhotoFile(file)}
              size="large"
            />
          </div>

          <FormField
            icon={IoPersonOutline}
            label={t('register.business.businessName')}
            id="name"
            name="name"
            value={business.name}
            onChange={handleChange}
            placeholder={t('register.business.businessNamePlaceholder')}
            required
          />

          <FormField
            icon={MdOutlineMailLock}
            label={t('register.business.businessEmail')}
            id="email"
            name="email"
            type="email"
            value={business.email}
            onChange={handleChange}
            placeholder={t('register.business.emailPlaceholder')}
            required
          />

          <FormField
            icon={RiLockPasswordLine}
            label={t('register.business.password')}
            id="password"
            name="password"
            type="password"
            value={business.password}
            onChange={handleChange}
            placeholder={t('register.business.passwordPlaceholder')}
            required
          />

          <FormField
            icon={FaPhone}
            label={t('register.business.mobilePhone')}
            id="mobilePhone"
            name="mobilePhone"
            type="tel"
            value={business.mobilePhone}
            onChange={handleChange}
            placeholder={t('register.business.mobilePhonePlaceholder')}
            pattern="[0-9]{11}"
            required
          />

          <FormField
            icon={FaPhone}
            label={t('register.business.landlinePhone')}
            id="landlinePhone"
            name="landlinePhone"
            type="tel"
            value={business.landlinePhone}
            onChange={handleChange}
            placeholder={t('register.business.landlinePhonePlaceholder')}
            pattern="[0-9]{8}"
            required
          />

          <FormField
            icon={FaMapMarkerAlt}
            label={t('register.business.address')}
            id="address"
            name="address"
            value={business.address}
            onChange={handleChange}
            placeholder={t('register.business.addressPlaceholder')}
            required
          />

          <div className="grid gap-4 mb-4">
            <Label className="flex items-center gap-2 mb-2">
              <FaCreditCard />
              {t('register.business.paymentMethod')}
            </Label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-white dark:bg-[#37332f] border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2b2825] transition-colors">
                <input
                  type="checkbox"
                  checked={business.paymentMethod.includes('cash')}
                  onChange={() => handlePaymentMethodChange('cash')}
                  className="w-4 h-4 text-[#359487] bg-gray-100 border-gray-300 rounded focus:ring-[#359487] focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('register.business.cash')}</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-white dark:bg-[#37332f] border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2b2825] transition-colors">
                <input
                  type="checkbox"
                  checked={business.paymentMethod.includes('credit-card')}
                  onChange={() => handlePaymentMethodChange('credit-card')}
                  className="w-4 h-4 text-[#359487] bg-gray-100 border-gray-300 rounded focus:ring-[#359487] focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('register.business.creditCard')}</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-white dark:bg-[#37332f] border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2b2825] transition-colors">
                <input
                  type="checkbox"
                  checked={business.paymentMethod.includes('wallet')}
                  onChange={() => handlePaymentMethodChange('wallet')}
                  className="w-4 h-4 text-[#359487] bg-gray-100 border-gray-300 rounded focus:ring-[#359487] focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('register.business.wallet')}</span>
              </label>
            </div>
          </div>

          <FormField
            icon={FaBriefcase}
            label={t('register.business.specialization')}
            id="specialization"
            name="specialization"
            value={business.specialization}
            onChange={handleChange}
            placeholder={t('register.business.specializationPlaceholder')}
          />

          {/* Optional Fields Section */}
          <div className="border-t pt-4 mt-4">
            <p className="text-lg font-semibold mb-4 text-[#29b7a4]">{t('register.business.optionalInfo')}</p>
            
            <div className="grid gap-4 mb-4">
              <Label htmlFor="profileImage">
                {t('register.business.profileImage')}
              </Label>
              <Input
              type="file"
                onChange={handleChange}
                value={business.profileImage}
                name="profileImage"
                className="bg-white dark:bg-[#37332f] border border-gray-300 dark:border-gray-600"
                id="profileImage"
                placeholder={t('register.business.profileImagePlaceholder')}
              />
            </div>

            <div className="grid gap-4 mb-4">
              <Label htmlFor="businessImages">
                {t('register.business.businessImages')}
              </Label>
              <Input
              type="file"
                onChange={handleChange}
                value={business.businessImages}
                name="businessImages"
                className="bg-white dark:bg-[#37332f] border border-gray-300 dark:border-gray-600"
                id="businessImages"
                placeholder={t('register.business.businessImagesPlaceholder')}
              />
            </div>

            <WorkingTimeSection
              workingHours={business.workingHours}
              onChange={handleChange}
              onDayChange={handleDayChange}
              t={t}
            />

            <ServiceSection
              service={business.service}
              onChange={handleChange}
              t={t}
            />
          </div>

          <QueueSettingsSection
            queueSettings={business.queueSettings}
            onChange={handleChange}
            t={t}
          />

          <Button type="submit" className="w-full my-3" disabled={loading}>
            {loading ? t('register.business.creatingAccount') : t('register.business.createBusinessAccount')}
          </Button>

          <div className="text-center">
            <span>
              {t('register.business.alreadyHaveAccount')}
              <Link className='font-bold' href="./">
                {" "}{t('register.business.signIn')}
              </Link>
            </span>
          </div>
        </form>

      </div>
    </div>
  )
}

"use client";
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { MdOutlineMailLock } from "react-icons/md"
import { RiLockPasswordLine } from "react-icons/ri"
import { IoPersonOutline } from "react-icons/io5"
import { FaPhone, FaMapMarkerAlt, FaCreditCard, FaBriefcase } from "react-icons/fa"
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter();
  const API = 'http://localhost:5000/api/v1/auth/register/business';
  
  const [business, setBusiness] = useState({
    name: '',
    email: '',
    password: '',
    mobilePhone: '',
    landlinePhone: '',
    address: '',
    paymentMethod: '',
    specialization: '',
    profileImage: '',
    businessImages: '',
    workingHours: '',
    service: '',
    maxPatientsPerDay: '',
    lastAppointmentTime: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setBusiness({...business, [e.target.name]: e.target.value});
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
        paymentMethod: business.paymentMethod,
      };

      if (business.specialization) businessData.specialization = business.specialization;
      if (business.profileImage) businessData.profileImage = business.profileImage;
      if (business.businessImages) {
        businessData.businessImages = business.businessImages.split(',').map(url => url.trim());
      }
      if (business.workingHours) businessData.workingHours = business.workingHours;
      if (business.service) businessData.service = business.service.split('\n').filter(s => s.trim());
      if (business.maxPatientsPerDay) {
        businessData.queueSettings = {
          maxPatientsPerDay: parseInt(business.maxPatientsPerDay)
        };
      }
      if (business.lastAppointmentTime && businessData.queueSettings) {
        businessData.queueSettings.lastAppointmentTime = business.lastAppointmentTime;
      }

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

        <p className="text-3xl font-bold mb-2 text-[#29b7a4] text-center">Create Business Account</p>
        <span className="block mb-8 text-gray-500 text-center dark:text-white">Register your business to manage queues.</span>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="grid gap-4 mb-4">
            <Label htmlFor="name">
              <IoPersonOutline />
              Business Name *
            </Label>
            <Input
              onChange={handleChange}
              value={business.name}
              name="name"
              className="bg-[#ECECF0]"
              id="name"
              placeholder="Enter Business Name"
              required
            />
          </div>

          <div className="grid gap-4 mb-4">
            <Label htmlFor="email">
              <MdOutlineMailLock />
              Business Email *
            </Label>
            <Input
              type="email"
              onChange={handleChange}
              value={business.email}
              name="email"
              className="bg-[#ECECF0]"
              id="email"
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="grid gap-4 mb-4">
            <Label htmlFor="mobilePhone">
              <FaPhone />
              Mobile Phone * (11 digits)
            </Label>
            <Input
              type="tel"
              onChange={handleChange}
              value={business.mobilePhone}
              name="mobilePhone"
              className="bg-[#ECECF0]"
              id="mobilePhone"
              placeholder="01234567890"
              pattern="[0-9]{11}"
              required
            />
          </div>

          <div className="grid gap-4 mb-4">
            <Label htmlFor="landlinePhone">
              <FaPhone />
              Landline Phone * (8 digits)
            </Label>
            <Input
              type="tel"
              onChange={handleChange}
              value={business.landlinePhone}
              name="landlinePhone"
              className="bg-[#ECECF0]"
              id="landlinePhone"
              placeholder="12345678"
              pattern="[0-9]{8}"
              required
            />
          </div>

          <div className="grid gap-4 mb-4">
            <Label htmlFor="address">
              <FaMapMarkerAlt />
              Address *
            </Label>
            <Input
              onChange={handleChange}
              value={business.address}
              name="address"
              className="bg-[#ECECF0]"
              id="address"
              placeholder="Enter Business Address"
              required
            />
          </div>

          <div className="grid gap-4 mb-4">
            <Label htmlFor="paymentMethod">
              <FaCreditCard />
              Payment Method *
            </Label>
            <select
              onChange={handleChange}
              value={business.paymentMethod}
              name="paymentMethod"
              className="bg-[#ECECF0] border border-input rounded-md px-3 py-2 text-sm"
              id="paymentMethod"
              required
            >
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="credit-card">Credit Card</option>
              <option value="wallet">Wallet</option>
            </select>
          </div>

          <div className="grid gap-4 mb-4">
            <Label htmlFor="specialization">
              <FaBriefcase />
              Specialization (Optional)
            </Label>
            <Input
              onChange={handleChange}
              value={business.specialization}
              name="specialization"
              className="bg-[#ECECF0]"
              id="specialization"
              placeholder="e.g., Dental Clinic, Medical Center"
            />
          </div>

          {/* Optional Fields Section */}
          <div className="border-t pt-4 mt-4">
            <p className="text-lg font-semibold mb-4 text-[#29b7a4]">Optional Information</p>
            
            <div className="grid gap-4 mb-4">
              <Label htmlFor="profileImage">
                Profile Image URL (Optional)
              </Label>
              <Input
                onChange={handleChange}
                value={business.profileImage}
                name="profileImage"
                className="bg-[#ECECF0]"
                id="profileImage"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="grid gap-4 mb-4">
              <Label htmlFor="businessImages">
                Business Images URLs (Optional)
              </Label>
              <Input
                onChange={handleChange}
                value={business.businessImages}
                name="businessImages"
                className="bg-[#ECECF0]"
                id="businessImages"
                placeholder="Separate multiple URLs with commas"
              />
              <span className="text-xs text-gray-500">Example: url1.jpg, url2.jpg, url3.jpg</span>
            </div>

            <div className="grid gap-4 mb-4">
              <Label htmlFor="workingHours">
                Working Hours (Optional)
              </Label>
              <textarea
                onChange={handleChange}
                value={business.workingHours}
                name="workingHours"
                className="bg-[#ECECF0] border border-input rounded-md px-3 py-2 text-sm min-h-[80px]"
                id="workingHours"
                placeholder="Example: Sunday-Thursday: 9:00 AM - 5:00 PM"
              />
            </div>

            <div className="grid gap-4 mb-4">
              <Label htmlFor="service">
                Services Offered (Optional)
              </Label>
              <textarea
                onChange={handleChange}
                value={business.service}
                name="service"
                className="bg-[#ECECF0] border border-input rounded-md px-3 py-2 text-sm min-h-[80px]"
                id="service"
                placeholder="List your services (one per line)"
              />
            </div>

            <div className="grid gap-4 mb-4">
              <Label htmlFor="maxPatientsPerDay">
                Max Patients Per Day (Optional)
              </Label>
              <Input
                onChange={handleChange}
                value={business.maxPatientsPerDay}
                name="maxPatientsPerDay"
                className="bg-[#ECECF0]"
                id="maxPatientsPerDay"
                type="number"
                placeholder="e.g., 50"
              />
            </div>

            <div className="grid gap-4 mb-4">
              <Label htmlFor="lastAppointmentTime">
                Last Appointment Time (Optional)
              </Label>
              <Input
                onChange={handleChange}
                value={business.lastAppointmentTime}
                name="lastAppointmentTime"
                className="bg-[#ECECF0]"
                id="lastAppointmentTime"
                type="time"
                placeholder="16:00"
              />
            </div>
          </div>

          <div className="grid gap-4 mb-4">
            <Label htmlFor="password">
              <RiLockPasswordLine />
              Password *
            </Label>
            <Input
              type="password"
              onChange={handleChange}
              value={business.password}
              name="password"
              className="bg-[#ECECF0]"
              id="password"
              placeholder="Create a Password"
              required
            />
          </div>

          <Button type="submit" className="w-full my-3" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <div className="text-center">
            <span>
              Already have an account?
              <Link className='font-bold' href="./">
                {" "}Sign in
              </Link>
            </span>
          </div>
        </form>

      </div>
    </div>
  )
}

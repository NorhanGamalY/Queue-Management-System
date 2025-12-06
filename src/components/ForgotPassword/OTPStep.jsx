"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from 'flowbite-react';
import Link from 'next/link';
import { HiOutlineKey } from 'react-icons/hi';

export default function OTPStep({ otp, setOtp, onVerifyCode, onResend }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <Label htmlFor="otp" className="flex items-center gap-2">
          <HiOutlineKey />
          Verification Code (OTP)
        </Label>
        <Input
          type="text"
          id="otp"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="bg-[#ECECF0] dark:bg-[#37332f] dark:text-white text-center text-2xl tracking-widest font-mono"
          placeholder="000000"
          maxLength={6}
          required
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Check your email for the 6-digit code
        </p>
      </div>
      
      <Button className="w-full" onClick={onVerifyCode}>
        Verify Code
      </Button>

      <div className="text-center space-y-2">
        <button 
          onClick={onResend}
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#29b7a4] dark:hover:text-[#29b7a4] font-medium block w-full"
        >
          Didn't receive code? Resend
        </button>
        <Link href="/login" className="text-sm text-[#29b7a4] hover:underline font-medium flex items-center justify-center gap-2">
          <span>←</span> Back to Login
        </Link>
      </div>
    </div>
  );
}

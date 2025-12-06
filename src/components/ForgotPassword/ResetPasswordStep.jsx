"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from 'flowbite-react';
import { RiLockPasswordLine } from 'react-icons/ri';
import PasswordValidationDisplay from './PasswordValidationDisplay';

export default function ResetPasswordStep({ 
  newPassword, 
  confirmPassword, 
  passwordValidation,
  onPasswordChange, 
  onConfirmPasswordChange,
  onResetPassword,
  onBack
}) {
  return (
    <div className="space-y-6">
      <PasswordValidationDisplay validation={passwordValidation} />
      
      <div className="grid gap-4">
        <Label htmlFor="newPassword" className="flex items-center gap-2">
          <RiLockPasswordLine />
          New Password
        </Label>
        <Input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={onPasswordChange}
          className="bg-[#ECECF0] dark:bg-[#37332f] dark:text-white"
          placeholder="Enter new password"
          required
        />
      </div>

      <div className="grid gap-4">
        <Label htmlFor="confirmPassword" className="flex items-center gap-2">
          <RiLockPasswordLine />
          Confirm Password
        </Label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          className="bg-[#ECECF0] dark:bg-[#37332f] dark:text-white"
          placeholder="Confirm new password"
          required
        />
      </div>

      <Button className="w-full" onClick={onResetPassword}>
        Reset Password
      </Button>
      
      <div className="text-center">
        <p onClick={onBack} className="cursor-pointer text-sm text-[#29b7a4] hover:underline font-medium flex items-center justify-center gap-2">
          <span>←</span> Back to Verify OTP
        </p>
      </div>
    </div>
  );
}

"use client";
import { MdLockReset } from 'react-icons/md';

export default function StepHeader({ step, error, success }) {
  return (
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-[#29b7a4]/10 dark:bg-[#29b7a4]/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <MdLockReset className="text-[#29b7a4] text-4xl" />
      </div>
      
      {step === 1 && (
        <div>
          <h2 className="text-3xl font-bold mb-2 text-[#29b7a4]">
            Forgot Password?
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            No worries! Enter your email and we'll send you a reset code.
          </p>
        </div>
      )}
      
      {step === 2 && (
        <div>
          <h2 className="text-3xl font-bold mb-2 text-[#29b7a4]">
            Verify OTP
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Enter the OTP sent to your email.
          </p>
          {error === "Please enter a valid 6-digit code" && (
            <p className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-full">
              Please enter a valid 6-digit code
            </p>
          )}
        </div>
      )}
      
      {step === 3 && (
        <div>
          <h2 className="text-3xl font-bold mb-2 text-[#29b7a4]">
            Reset Password
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Create a new password.
          </p>
          {error === "Passwords do not match" && (
            <p className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-full">
              Passwords do not match
            </p>
          )}
          {error === "OTP is invalid or has expired" && (
            <p className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-full">
              OTP is invalid or has expired
            </p>
          )}
          {success === "Password reset successfully" && (
            <p className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded w-full">
              Password reset successfully
            </p>
          )}
        </div>
      )}
    </div>
  );
}

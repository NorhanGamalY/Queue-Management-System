"use client";
import EmailStep from '@/components/ForgotPassword/EmailStep';
import OTPStep from '@/components/ForgotPassword/OTPStep';
import ResetPasswordStep from '@/components/ForgotPassword/ResetPasswordStep';
import StepHeader from '@/components/ForgotPassword/StepHeader';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function page() {
  const router = useRouter()
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasDigit: false,
    hasSpecialChar: false,
  });

  // Validate password in real-time
  const validatePassword = (password) => {
    setPasswordValidation({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasDigit: /\d/.test(password),
      hasSpecialChar: /[@$!%*?&]/.test(password),
    });
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    validatePassword(value);
  };

  const handleSendResetCode = async () => {
    try{
      const res = await fetch("http://localhost:5000/api/v1/auth/forgot-password", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      })
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.message);
      }
      console.log(data);
      setStep(2);
    }catch(error){
      console.log(error);
    }
  }

  const handleVerifyCode = () => {
    if(isNaN(otp) || otp.length !==6){
      setError('Please enter a valid 6-digit code');
      return;
    }
    setStep(3);
  }

  const handleResetPassword = async () => {
    if(newPassword !== confirmPassword){
      setError("Passwords do not match");
      return;
    }
    try{
      const res = await fetch(`http://localhost:5000/api/v1/auth/reset-password/${otp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({password: newPassword}),
      })
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.message);
      }
      console.log(data);
      setSuccess("Password reset successfully");
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }catch(err){
      setError(err.message);
    }
  }

  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-[#221F1B]">
      
      <div className="relative hidden md:block md:h-full bg-[#287b70] dark:bg-black">
        <Image
          src="/register7.png"
          fill
          className="object-contain w-full h-full"
          alt="Forgot Password visual"
        />
      </div>

      <div className="flex flex-col justify-center px-10 py-12 bg-white xl:w-2/3 w-full mx-auto dark:bg-[#221F1B]">
        
        <StepHeader step={step} error={error} success={success} />

        {step === 1 && (
          <EmailStep 
            email={email}
            setEmail={setEmail}
            onSendCode={handleSendResetCode}
          />
        )}

        {step === 2 && (
          <OTPStep
            otp={otp}
            setOtp={setOtp}
            onVerifyCode={handleVerifyCode}
            onResend={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <ResetPasswordStep
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            passwordValidation={passwordValidation}
            onPasswordChange={handlePasswordChange}
            onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
            onResetPassword={handleResetPassword}
            onBack={() => setStep(2)}
          />
        )}

      </div>
    </div>
  );
}

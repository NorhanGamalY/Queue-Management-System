"use client";

export default function PasswordValidationDisplay({ validation }) {
  return (
    <div className='border border-[#ECECF0] dark:border-[#37332f] p-4 rounded-md space-y-2'>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        <span className="mr-2">{validation.minLength ? '✅' : '❌'}</span>
        must be 8 characters or more
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        <span className="mr-2">{validation.hasUppercase ? '✅' : '❌'}</span>
        must contain at least one uppercase letter
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        <span className="mr-2">{validation.hasLowercase ? '✅' : '❌'}</span>
        must contain at least one lowercase letter
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        <span className="mr-2">{validation.hasDigit ? '✅' : '❌'}</span>
        must contain at least one digit
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        <span className="mr-2">{validation.hasSpecialChar ? '✅' : '❌'}</span>
        must contain at least one special character (@$!%*?&)
      </p>
    </div>
  );
}

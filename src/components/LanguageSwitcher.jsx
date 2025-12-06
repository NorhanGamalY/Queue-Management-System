"use client";

import { Languages } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Get current locale from cookie
    const currentLocale = document.cookie
      .split('; ')
      .find(row => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1] || 'en';
    setLocale(currentLocale);

    // Set HTML dir attribute
    document.documentElement.dir = currentLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLocale;
  }, []);

  const changeLanguage = (newLocale) => {
    // Set cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    
    // Update HTML attributes
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
    
    setLocale(newLocale);
    setIsOpen(false);
    
    // Reload page to apply changes
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Change language"
      >
        <Languages size={20} className="text-gray-700 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase">
          {locale}
        </span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-48 bg-white dark:bg-[#2b2825] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden ltr:-mr-3 rtl:-ml-3">
            <button
              onClick={() => changeLanguage('en')}
              className={`w-full px-5 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                locale === 'en' ? 'bg-[#359487]/10 dark:bg-[#C6FE02]/10 text-[#359487] dark:text-[#C6FE02] font-semibold' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🇪🇳</span>
                <span>English</span>
              </div>
            </button>
            <button
              onClick={() => changeLanguage('ar')}
              className={`w-full px-5 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                locale === 'ar' ? 'bg-[#359487]/10 dark:bg-[#C6FE02]/10 text-[#359487] dark:text-[#C6FE02] font-semibold' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🇦🇷</span>
                <span>العربية</span>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { useTranslations } from "@/hooks/useTranslations";

export default function PlaceholderTab({ tabName }) {
  const { t } = useTranslations();
  
  return (
    <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-sm p-6 mb-8 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 capitalize">
        {tabName}
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        {t('businessDashboard.placeholder.underDevelopment')}
      </p>
    </div>
  );
}

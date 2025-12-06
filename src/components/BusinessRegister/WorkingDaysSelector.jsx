"use client";
import { Label } from "@/components/ui/label";

export default function WorkingDaysSelector({ selectedDays, onDayChange, t }) {
  const days = [
    { key: 'Saturday', label: t('register.business.saturday') },
    { key: 'Sunday', label: t('register.business.sunday') },
    { key: 'Monday', label: t('register.business.monday') },
    { key: 'Tuesday', label: t('register.business.tuesday') },
    { key: 'Wednesday', label: t('register.business.wednesday') },
    { key: 'Thursday', label: t('register.business.thursday') },
    { key: 'Friday', label: t('register.business.friday') }
  ];

  return (
    <div className="grid gap-4 mb-4">
      <Label>{t('register.business.workingDays')}</Label>
      <div className="grid grid-cols-2 gap-2">
        {days.map((day) => (
          <label key={day.key} className="flex items-center gap-2 cursor-pointer p-2 bg-white dark:bg-[#37332f] border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-[#2b2825]">
            <input
              type="checkbox"
              checked={selectedDays.includes(day.key)}
              onChange={() => onDayChange(day.key)}
              className="w-4 h-4 text-[#359487] bg-gray-100 border-gray-300 rounded focus:ring-[#359487] focus:ring-2"
            />
            <span className="text-sm">{day.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

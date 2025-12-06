"use client";
import FormField from './FormField';

export default function QueueSettingsSection({ queueSettings, onChange, t }) {
  return (
    <div className="border-t pt-4 mt-4">
      <p className="text-lg font-semibold mb-4 text-[#29b7a4]">{t('register.business.queueSettings')}</p>

      <FormField
        label={t('register.business.maxPatientsPerDay')}
        id="maxPatientsPerDay"
        name="maxPatientsPerDay"
        type="number"
        value={queueSettings.maxPatientsPerDay}
        onChange={onChange}
        placeholder={t('register.business.maxPatientsPlaceholder')}
      />

      <FormField
        label={t('register.business.lastAppointmentTime')}
        id="lastAppointmentTime"
        name="lastAppointmentTime"
        type="time"
        value={queueSettings.lastTimeToAppoint}
        onChange={onChange}
        placeholder={t('register.business.lastAppointmentPlaceholder')}
      />
    </div>
  );
}

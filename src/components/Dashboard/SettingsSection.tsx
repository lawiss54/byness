'use client'

import React, { useState } from 'react';
import { Save} from 'lucide-react';
import { siteSettings as initialSettings } from '@/app/admin/Dashboard/data/mockData';
import { SiteSettings } from '@/app/admin/Dashboard/types';
import ContactInformation from './Settings/ContactInformation';
import BasicInformation from './Settings/BasicInformation';
import Yalidine from './Settings/Yalidine';

export default function SettingsSection() {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to a backend
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleInputChange = (field: keyof SiteSettings, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-600 mt-2">Configure your store&apos;s general settings</p>
      </div>

      {/* Basic Information */}
      <BasicInformation settings={settings} handleInputChange={handleInputChange} />

      {/* Contact Information */}
      <ContactInformation settings={settings} handleInputChange={handleInputChange} />

        {/*   Link */}
          <Yalidine settings={settings} handleInputChange={handleInputChange} />

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      {/* Save Confirmation */}
      {showSaveMessage && (
        <div className="fixed bottom-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg">
          Settings saved successfully!
        </div>
      )}
    </div>
  );
}
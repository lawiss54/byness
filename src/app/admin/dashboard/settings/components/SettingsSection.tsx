'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Facebook, BarChart3, Save } from 'lucide-react';
import { Button, Card } from '@/components/shared/ui';
import { useSettings } from '../hooks/useSettings';
import type { Settings as SettingsType } from '../services';
import BasicInformation from './BasicInformation'; // Assuming this is a sub-component
import ContactInformation from './ContactInformation'; // Assuming this is a sub-component
import PixelsIformation from './PixelsIformation'; // Assuming this is a sub-component

interface SettingsSectionProps {
  initialSettings: SettingsType | null;
}

export default function SettingsSection({ initialSettings }: SettingsSectionProps) {
  const [activeTab, setActiveTab] = useState('general');
  const { settings, setSettings, loading, saveSettings } = useSettings({ initialSettings });

  const handleSave = () => {
    if (settings) {
      saveSettings(settings);
    }
  };

  const tabs = [
    { id: 'general', label: 'Paramètres généraux', icon: Settings },
    { id: 'social', label: 'Réseaux sociaux', icon: Facebook },
    { id: 'pixels', label: 'Pixels publicitaires', icon: BarChart3 }
  ];

  // The original component had three separate forms for site, social, and pixels.
  // I will assume these have been extracted into their own components.
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <BasicInformation settings={settings.settings} setSettings={setSettings} />;
      case 'social':
        return <ContactInformation settings={settings.socialmedia} setSettings={setSettings} />; // Simplified
      case 'pixels':
        return <PixelsIformation settings={settings.pixel} setSettings={setSettings} />; // Simplified
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres du site</h1>
          <p className="text-gray-600 mt-2">Gérez les paramètres de votre boutique.</p>
        </div>
        <Button onClick={handleSave} disabled={loading} icon={<Save />}>
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </div>

      <Card className="p-1">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-camel-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
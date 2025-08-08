'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Settings } from '../services'; // Assuming settings type is in the service file

interface UseSettingsProps {
  initialSettings: Settings | null;
}

export const useSettings = ({ initialSettings }: UseSettingsProps) => {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(false);

  // The logic for different types of settings (site, social, pixel)
  // would be managed here. For simplicity, I'm using a single settings object.
  // The original component had a more complex state structure.

  useEffect(() => {
    // If initialSettings are provided, set them.
    // The original component had complex logic with localStorage
    // which we are simplifying by relying on server-fetched data.
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  const saveSettings = async (newSettings: Settings) => {
    try {
      setLoading(true);
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ data: newSettings }) // Assuming API expects a 'data' key
      });

      if (!res.ok) {
        throw new Error('Failed to save settings');
      }

      const response = await res.json();
      setSettings(response.data); // Update state with response from server
      toast.success('Paramètres enregistrés avec succès');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error("Erreur lors de l'enregistrement des paramètres");
    } finally {
      setLoading(false);
    }
  };

  return {
    settings,
    setSettings,
    loading,
    saveSettings
  };
};

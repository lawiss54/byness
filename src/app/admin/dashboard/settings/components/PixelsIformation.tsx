'use client';
import React, { useState } from 'react';
import { Subscript, Eye, EyeOff } from "lucide-react";
import { PixelTracking } from '../types';

interface PixelsInformationProps {
  settings: PixelTracking;
  handleInputChange: (field: keyof PixelTracking, value: string) => void;
}

export default function PixelsInformation({ settings, handleInputChange }: PixelsInformationProps) {
  // Separate state for each field for better control
  const [showFields, setShowFields] = useState({
    facebookPixel: false,
    tiktokPixel: false,
    googleAnalytics: false
  });

  // Function to toggle visibility of a specific field
  const toggleFieldVisibility = (field: keyof typeof showFields) => {
    setShowFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Reusable component for hideable input field
  const PixelInputField = ({ 
    label, 
    field, 
    value, 
    placeholder 
  }: {
    label: string;
    field: keyof PixelTracking;
    value: string;
    placeholder?: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={showFields[field as keyof typeof showFields] ? "text" : "password"}
          value={value || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
        />
        <button
          type="button"
          onClick={() => toggleFieldVisibility(field as keyof typeof showFields)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors duration-200"
          aria-label={showFields[field as keyof typeof showFields] ? "Masquer le texte" : "Afficher le texte"}
        >
          {showFields[field as keyof typeof showFields] ? (
            <EyeOff className="h-4 w-4 text-gray-500 hover:text-gray-700" />
          ) : (
            <Eye className="h-4 w-4 text-gray-500 hover:text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Subscript className="w-5 h-5 text-blue-600" />
          <span>Intégration de pixels</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Insérez vos identifiants de pixel pour suivre les conversions
        </p>
      </div>
      
      <div className="p-6 space-y-6">
        <PixelInputField
          label="Pixel Facebook"
          field="facebookPixel"
          value={settings?.facebookPixel}
          placeholder="Entrez l'ID du pixel Facebook"
        />
        
        <PixelInputField
          label="Pixel TikTok"
          field="tiktokPixel"
          value={settings?.tiktokPixel}
          placeholder="Entrez l'ID du pixel TikTok"
        />
        
        <PixelInputField
          label="Google Analytics"
          field="googleAnalytics"
          value={settings?.googleAnalytics}
          placeholder="Entrez l'ID Google Analytics (GA4)"
        />
      </div>
    </div>
  );
}
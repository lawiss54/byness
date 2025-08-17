'use client';
import React, { useState } from 'react';
import { Subscript, Eye, EyeOff } from "lucide-react";



interface YalidineSettings {
  storeName: string;
}

interface YalidineProps {
  settings: YalidineSettings;
  handleInputChange: (field: keyof YalidineSettings, value: string) => void;
}

export default function Yalidine({ settings, handleInputChange }: YalidineProps) {
    
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    return(
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Subscript className="w-5 h-5" />
            <span>Yalidine integration</span>
          </h2>
        </div>
        <div className="p-6 space-y-6">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Api Secret Key
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={settings?.storeName}
                onChange={(e) => handleInputChange('storeName', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

    );
}
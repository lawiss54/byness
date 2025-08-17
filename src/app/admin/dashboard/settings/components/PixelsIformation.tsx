'use client';
import React, { useState } from 'react';
import { Subscript, Eye, EyeOff } from "lucide-react";
import { PixelTracking } from '../types';

interface PixelsInformationProps {
  settings: PixelTracking;
  handleInputChange: (field: keyof PixelTracking, value: string) => void;
}

export default function PixelsInformation({ settings, handleInputChange }: PixelsInformationProps){
    const [showText, setShowText] = useState(false);

    const toggleTextVisibility = () => {
      setShowText(!showText);
    };

    return(
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Subscript className="w-5 h-5" />
            <span>Pixel integration</span>
          </h2>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facebook Pixel
            </label>
            <div className="relative">
              <input
                type={showText ? "text" : "password"}
                value={settings?.facebookPixel}
                onChange={(e) => handleInputChange('facebookPixel', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={toggleTextVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
              >
                {showText ? (
                  <EyeOff className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              TikTok Pixel
            </label>
            <div className="relative">
              <input
                type={showText ? "text" : "password"}
                value={settings?.tiktokPixel}
                onChange={(e) => handleInputChange('tiktokPixel', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={toggleTextVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
              >
                {showText ? (
                  <EyeOff className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Analytics
            </label>
            <div className="relative">
              <input
                type={showText ? "text" : "password"}
                value={settings?.googleAnalytics}
                onChange={(e) => handleInputChange('googleAnalytics', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={toggleTextVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
              >
                {showText ? (
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
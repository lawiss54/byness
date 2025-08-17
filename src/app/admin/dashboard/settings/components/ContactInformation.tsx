import { Facebook, Instagram, Mail, MapPin, Phone, TicketCheckIcon } from "lucide-react";
import {SocialMedia} from "../types";


interface ContactInformationProps {
  settings: SocialMedia;
  handleInputChange: (field: keyof SocialMedia, value: string) => void;
}

export default function ContactInformation({ settings, handleInputChange }: ContactInformationProps) {

    return(
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Réseaux sociaux</span>
          </h2>
        </div>
        
        <div className="p-6 space-y-6">

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Facebook className="w-4 h-4 inline mr-1" />
                  Facebook
                </label>
                <input
                  type="text"
                  value={settings?.facebook}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Instagram className="w-4 h-4 inline mr-1" />
                  Instagram
                </label>
                <input
                  type="text"
                  value={settings?.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <TicketCheckIcon className="w-4 h-4 inline mr-1" />
                  TikTok
                </label>
                <input
                  type="text"
                  value={settings?.tiktok}
                  onChange={(e) => handleInputChange('tiktok', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <TicketCheckIcon className="w-4 h-4 inline mr-1" />
                  WhatsApp
                </label>
                <input
                  type="text"
                  value={settings?.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
              
          </div>
        </div>
      </div>
    )
}
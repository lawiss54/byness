'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Globe,
  Image,
  Facebook,
  Instagram, BarChart3,
  Save,
  Upload,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Copy,
  ExternalLink
} from 'lucide-react';
import { Button, Input, Card, Badge } from '@/components/shared/ui';
import { toast } from 'react-toastify';
import { SiTiktok, SiWhatsapp } from 'react-icons/si';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteLogo: string;
  siteIcon: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

interface SocialLinks {
  facebook: string;
  instagram: string;
  tiktok: string;
  whatsapp: string;
}

interface PixelSettings {
  facebookPixel: string;
  googleAnalytics: string;
  tiktokPixel: string;
}

// Default values to ensure inputs are always controlled
const defaultSiteSettings: SiteSettings = {
  siteName: '',
  siteDescription: '',
  siteLogo: '',
  siteIcon: '',
  contactEmail: '',
  contactPhone: '',
  address: ''
};

const defaultSocialLinks: SocialLinks = {
  facebook: '',
  instagram: '',
  tiktok: '',
  whatsapp: ''
};

const defaultPixelSettings: PixelSettings = {
  facebookPixel: '',
  googleAnalytics: '',
  tiktokPixel: '',
};

export default function SettingsSection() {
  // State Management
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [showPixels, setShowPixels] = useState(false);

  // Settings States with default values
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(defaultSocialLinks);
  const [pixelSettings, setPixelSettings] = useState<PixelSettings>(defaultPixelSettings);

  // Load settings on component mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      
      // Fetch data from API
      const getData = async () => {
        const res = await fetch('/api/settings', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          }
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch settings');
        }
        
        const response = await res.json();
        
        // Ensure all values are strings and merge with defaults
        const settings = { ...defaultSiteSettings, ...response.data.settings };
        const socialmedia = { ...defaultSocialLinks, ...response.data.socialmedia };
        const pixel = { ...defaultPixelSettings, ...response.data.pixel };
        
        // Convert any null/undefined values to empty strings
        Object.keys(settings).forEach(key => {
          if (settings[key as keyof SiteSettings] == null) {
            settings[key as keyof SiteSettings] = '';
          }
        });
        
        Object.keys(socialmedia).forEach(key => {
          if (socialmedia[key as keyof SocialLinks] == null) {
            socialmedia[key as keyof SocialLinks] = '';
          }
        });
        
        Object.keys(pixel).forEach(key => {
          if (pixel[key as keyof PixelSettings] == null) {
            pixel[key as keyof PixelSettings] = '';
          }
        });
        
        // Save data to localStorage
        localStorage.setItem('siteSettings', JSON.stringify(settings));
        localStorage.setItem('socialLinks', JSON.stringify(socialmedia));
        localStorage.setItem('pixelSettings', JSON.stringify(pixel));
        
        // Update state after saving
        setSiteSettings(settings);
        setSocialLinks(socialmedia);
        setPixelSettings(pixel);
      };

      // First read data from localStorage
      const savedSiteSettings = localStorage.getItem('siteSettings');
      const savedSocialLinks = localStorage.getItem('socialLinks');
      const savedPixelSettings = localStorage.getItem('pixelSettings');

      // If data exists in localStorage, use it
      if (savedSiteSettings) {
        const parsed = JSON.parse(savedSiteSettings);
        const settings = { ...defaultSiteSettings, ...parsed };
        // Ensure no null/undefined values
        Object.keys(settings).forEach(key => {
          if (settings[key as keyof SiteSettings] == null) {
            settings[key as keyof SiteSettings] = '';
          }
        });
        setSiteSettings(settings);
      }
      
      if (savedSocialLinks) {
        const parsed = JSON.parse(savedSocialLinks);
        const socialmedia = { ...defaultSocialLinks, ...parsed };
        // Ensure no null/undefined values
        Object.keys(socialmedia).forEach(key => {
          if (socialmedia[key as keyof SocialLinks] == null) {
            socialmedia[key as keyof SocialLinks] = '';
          }
        });
        setSocialLinks(socialmedia);
      }
      
      if (savedPixelSettings) {
        const parsed = JSON.parse(savedPixelSettings);
        const pixel = { ...defaultPixelSettings, ...parsed };
        // Ensure no null/undefined values
        Object.keys(pixel).forEach(key => {
          if (pixel[key as keyof PixelSettings] == null) {
            pixel[key as keyof PixelSettings] = '';
          }
        });
        setPixelSettings(pixel);
      }

      // If data doesn't exist in localStorage, fetch from API
      if (!savedSiteSettings || !savedSocialLinks || !savedPixelSettings) {
        await getData();
      }

    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('Erreur lors du chargement des paramètres');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setLoading(true);

      // Save to localStorage first
      localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
      localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
      localStorage.setItem('pixelSettings', JSON.stringify(pixelSettings));

      // Send data to API
      const data = {
        settings: siteSettings,
        socialmedia: socialLinks,
        pixel: pixelSettings
      };
      
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(data)
      });
      
      if (!res.ok) {
        throw new Error('Failed to save settings');
      }

      const response = await res.json();
      toast.success('Paramètres enregistrés avec succès');
      
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error("Erreur lors de l'enregistrement des paramètres");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (field: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSiteSettings(prev => ({
        ...prev,
        [field]: e.target?.result as string || ''
      }));
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Texte copié');
  };

  const tabs = [
    { id: 'general', label: 'Paramètres généraux', icon: Settings },
    { id: 'social', label: 'Réseaux sociaux', icon: Facebook },
    { id: 'pixels', label: 'Pixels publicitaires', icon: BarChart3 }
  ];

  const socialPlatforms = [
    { key: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-600', placeholder: 'https://facebook.com/votrepage' },
    { key: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-600', placeholder: 'https://instagram.com/votrecompte' },
    { key: 'tiktok', label: 'TikTok', icon: SiTiktok, color: 'text-black', placeholder: 'https://tiktok.com/@votrecompte' },
    { key: 'whatsapp', label: 'WhatsApp', icon: SiWhatsapp, color: 'text-green-600', placeholder: '+213xxxxxxxxx' }
  ];

  const pixelPlatforms = [
    {
      key: 'facebookPixel',
      label: 'Pixel Facebook',
      description: 'ID du pixel Facebook pour suivre les conversions',
      placeholder: '123456789012345',
      helpText: 'Vous pouvez trouver l\'ID dans les paramètres de Facebook Business Manager'
    },
    {
      key: 'googleAnalytics',
      label: 'Google Analytics',
      description: 'ID Google Analytics pour suivre les visiteurs',
      placeholder: 'GA-XXXXXXXXX-X',
      helpText: 'L\'ID commence par GA- ou G-'
    },
    {
      key: 'tiktokPixel',
      label: 'Pixel TikTok',
      description: 'ID du pixel TikTok pour les publicités',
      placeholder: 'CXXXXXXXXXXXXXXXXX',
      helpText: 'Disponible dans TikTok Ads Manager'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 min-h-screen">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres du site</h1>
          <p className="text-gray-600 mt-2">Gérez les paramètres généraux, les réseaux sociaux et les pixels publicitaires.</p>
        </div>
        <Button
          onClick={saveSettings}
          disabled={loading}
          icon={<Save className="w-4 h-4" />}
          className="bg-brand-camel-500 hover:bg-brand-camel-600"
        >
          {loading ? 'Enregistrement...' : 'Enregistrer les paramètres'}
        </Button>
      </div>

      {/* Tabs Navigation */}
      <Card className="p-1">
        <div className="flex space-x-1 space-x-reverse">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                ? 'bg-brand-camel-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              {React.createElement(tab.icon, { className: 'w-4 h-4' })}
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      <AnimatePresence mode="wait">
        {/* General Settings Tab */}
        {activeTab === 'general' && (
          <motion.div
            key="general"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Site Information */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-camel-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-brand-camel-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Informations du site</h2>
                  <p className="text-gray-600">Paramètres de base du site</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du site *
                  </label>
                  <Input
                    value={siteSettings.siteName}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, siteName: e.target.value }))}
                    placeholder="Nom de votre site"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail de contact
                  </label>
                  <Input
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="info@exemple.com"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description du site
                  </label>
                  <textarea
                    value={siteSettings.siteDescription}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                    placeholder="Brève description de votre site"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-camel-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de téléphone
                  </label>
                  <Input
                    value={siteSettings.contactPhone}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, contactPhone: e.target.value }))}
                    placeholder="+213 xxx xxx xxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse
                  </label>
                  <Input
                    value={siteSettings.address}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Adresse de l'entreprise"
                  />
                </div>
              </div>
            </Card>

            {/* Logo and Branding */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-sage-100 rounded-lg flex items-center justify-center">
                  <Image className="w-5 h-5 text-brand-sage-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Logo et identité visuelle</h2>
                  <p className="text-gray-600">Téléchargez le logo du site et son icône</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Site Logo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo du site
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-camel-400 transition-colors">
                    {siteSettings.siteLogo ? (
                      <div className="space-y-4">
                        <img
                          src={siteSettings.siteLogo}
                          alt="Site Logo"
                          className="max-h-20 mx-auto"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSiteSettings(prev => ({ ...prev, siteLogo: '' }))}
                        >
                          Supprimer le logo
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 mx-auto text-gray-400" />
                        <div>
                          <label className="cursor-pointer">
                            <span className="text-brand-camel-600 hover:text-brand-camel-700">
                              Choisir un fichier
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload('siteLogo', file);
                              }}
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 2 Mo</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Site Icon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icône du site (Favicon)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-camel-400 transition-colors">
                    {siteSettings.siteIcon ? (
                      <div className="space-y-4">
                        <img
                          src={siteSettings.siteIcon}
                          alt="Site Icon"
                          className="w-16 h-16 mx-auto"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSiteSettings(prev => ({ ...prev, siteIcon: '' }))}
                        >
                          Supprimer l'icône
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 mx-auto text-gray-400" />
                        <div>
                          <label className="cursor-pointer">
                            <span className="text-brand-camel-600 hover:text-brand-camel-700">
                              Choisir un fichier
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload('siteIcon', file);
                              }}
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-1">ICO, PNG 32x32px</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Social Media Tab */}
        {activeTab === 'social' && (
          <motion.div
            key="social"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Liens des réseaux sociaux</h2>
                  <p className="text-gray-600">Ajoutez vos comptes sociaux ici</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {socialPlatforms.map((platform) => (
                  <div key={platform.key} className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      {React.createElement(platform.icon, {
                        className: `w-4 h-4 ${platform.color}`
                      })}
                      {platform.label}
                    </label>
                    <div className="relative">
                      <Input
                        value={socialLinks[platform.key as keyof SocialLinks]}
                        onChange={(e) => setSocialLinks(prev => ({
                          ...prev,
                          [platform.key]: e.target.value
                        }))}
                        placeholder={platform.placeholder}
                        className="pr-10"
                      />
                      {socialLinks[platform.key as keyof SocialLinks] && (
                        <button
                          onClick={() => window.open(socialLinks[platform.key as keyof SocialLinks], '_blank')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links Preview */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Aperçu des liens</h3>
                <div className="flex flex-wrap gap-3">
                  {socialPlatforms.map((platform) => {
                    const link = socialLinks[platform.key as keyof SocialLinks];
                    return link ? (
                      <Badge
                        key={platform.key}
                        variant="default"
                        className="flex items-center gap-2"
                      >
                        {React.createElement(platform.icon, {
                          className: `w-3 h-3 ${platform.color}`
                        })}
                        {platform.label}
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Pixels Tab */}
        {activeTab === 'pixels' && (
          <motion.div
            key="pixels"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Pixels publicitaires et suivi</h2>
                    <p className="text-gray-600">Configurer les pixels de suivi pour les plateformes publicitaires</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowPixels(!showPixels)}
                  icon={showPixels ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                >
                  {showPixels ? 'Masquer' : 'Afficher'} les identifiants
                </Button>
              </div>

              {/* Security Warning */}
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Alerte de sécurité</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Ne partagez pas les identifiants des pixels avec des personnes non autorisées.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {pixelPlatforms.map((platform) => (
                  <div key={platform.key} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{platform.label}</h3>
                        <p className="text-sm text-gray-600">{platform.description}</p>
                      </div>
                      {pixelSettings[platform.key as keyof PixelSettings] && (
                        <Badge variant="success" className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Actif
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="relative">
                        <Input
                          type={showPixels ? 'text' : 'password'}
                          value={pixelSettings[platform.key as keyof PixelSettings]}
                          onChange={(e) => setPixelSettings(prev => ({
                            ...prev,
                            [platform.key]: e.target.value
                          }))}
                          placeholder={platform.placeholder}
                          className="pr-10"
                        />
                        {pixelSettings[platform.key as keyof PixelSettings] && (
                          <button
                            onClick={() => copyToClipboard(pixelSettings[platform.key as keyof PixelSettings])}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-gray-500">{platform.helpText}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pixel Status Summary */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Statut des pixels</h3>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                  {pixelPlatforms.map((platform) => {
                    const isActive = !!pixelSettings[platform.key as keyof PixelSettings];
                    return (
                      <div
                        key={platform.key}
                        className={`p-3 rounded-lg border-2 ${isActive
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-white'
                          }`}
                      >
                        <div className="text-center">
                          <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${isActive ? 'bg-green-100' : 'bg-gray-100'
                            }`}>
                            {isActive ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                          <p className="text-xs font-medium text-gray-900">{platform.label}</p>
                          <p className={`text-xs ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                            {isActive ? 'Actif' : 'Inactif'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
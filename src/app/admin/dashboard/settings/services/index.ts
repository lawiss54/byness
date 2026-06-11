import type { Settings } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_URL;

export const fallbackSettings: Settings = {
  settings: {
    siteName: 'By Ness',
    siteDescription: 'Découvrez le luxe et l’élégance avec notre collection de marques premium.',
    address: 'Alger, Algérie',
    siteLogo: '/logo.png',
    siteIcon: '/favicon.ico',
    contactPhone: '+213 555 00 00 00',
    contactEmail: 'contact@byness.dz',
  },
  socialmedia: {
    facebook: 'https://facebook.com/bynessdz',
    instagram: 'https://instagram.com/byness.dz',
    tiktok: 'https://tiktok.com/@bynessdz',
    whatsapp: 'https://wa.me/213555000000',
  },
  pixel: {
    facebookPixel: '',
    googleAnalytics: '',
    googleAds: '',
    snapchatPixel: '',
    tiktokPixel: '',
  },
};

export function normalizeSettings(value: Partial<Settings> | null | undefined): Settings {
  const source = value && typeof value === 'object' ? value : {};

  return {
    settings: {
      siteName: source.settings?.siteName ?? fallbackSettings.settings.siteName,
      siteDescription: source.settings?.siteDescription ?? fallbackSettings.settings.siteDescription,
      address: source.settings?.address ?? fallbackSettings.settings.address,
      siteLogo: source.settings?.siteLogo ?? fallbackSettings.settings.siteLogo,
      siteIcon: source.settings?.siteIcon ?? fallbackSettings.settings.siteIcon,
      contactPhone: source.settings?.contactPhone ?? fallbackSettings.settings.contactPhone,
      contactEmail: source.settings?.contactEmail ?? fallbackSettings.settings.contactEmail,
    },
    socialmedia: {
      facebook: source.socialmedia?.facebook ?? fallbackSettings.socialmedia.facebook,
      instagram: source.socialmedia?.instagram ?? fallbackSettings.socialmedia.instagram,
      tiktok: source.socialmedia?.tiktok ?? fallbackSettings.socialmedia.tiktok,
      whatsapp: source.socialmedia?.whatsapp ?? fallbackSettings.socialmedia.whatsapp,
    },
    pixel: {
      facebookPixel: source.pixel?.facebookPixel ?? fallbackSettings.pixel.facebookPixel,
      googleAnalytics: source.pixel?.googleAnalytics ?? fallbackSettings.pixel.googleAnalytics,
      googleAds: source.pixel?.googleAds ?? fallbackSettings.pixel.googleAds,
      snapchatPixel: source.pixel?.snapchatPixel ?? fallbackSettings.pixel.snapchatPixel,
      tiktokPixel: source.pixel?.tiktokPixel ?? fallbackSettings.pixel.tiktokPixel,
    },
  };
}

export async function getSettings(): Promise<Settings> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/settings`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch settings');
    }

    const data = await res.json();
    return normalizeSettings(data?.data ?? data ?? fallbackSettings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return normalizeSettings(fallbackSettings);
  }
}

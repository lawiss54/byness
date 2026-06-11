import {Settings} from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_URL;

const fallbackSettings = {
  settings: {
    siteName: 'By Ness',
    siteDescription: 'Découvrez le luxe et l’élégance avec notre collection de marques premium.',
    siteLogo: '/logo.png',
    siteIcon: '/favicon.ico',
    contactPhone: '+213 555 00 00 00',
    contactEmail: 'contact@byness.dz',
    locale: 'fr',
    keywords: ['byness', 'vêtements femme', 'algérie', 'premium', 'mode', 'luxe'],
  },
  socialmedia: {
    facebook: 'https://facebook.com/bynessdz',
    instagram: 'https://instagram.com/byness.dz',
    tiktok: 'https://tiktok.com/@bynessdz',
    whatsapp: 'https://wa.me/213555000000',
  },
  pixel: {},
};

export async function getSettings(): Promise<Settings> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/settings`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch settings');
    }

    const data = await res.json();
    return data?.data ?? data ?? fallbackSettings;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return fallbackSettings as Settings;
  }
}

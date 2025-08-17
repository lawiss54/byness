export interface Settings {
  // Define the shape of the settings object
  // This is an assumption based on the component names
  storeGeneral: StoreGeneral;
  socialMedia: SocialMedia;
  pixelTracking: PixelTracking;
  yalidineApiKey: string;
}

export interface StoreGeneral {
  siteName: string;
  siteDescription: string;
  address: string;
  contactPhone: string;
  contactEmail: string;
  siteIcon: File | string;
  siteLogo: File | string;
}

export interface SocialMedia {
  facebook: string;
  instagram: string;
  linkedin?: string;
  tiktok: string;
  twitter?: string;
  whatsapp: string;
  youtube?: string;
}

export interface PixelTracking{
  facebookPixel: string;
  googleAnalytics: string;
  googleAds: string;
  snapchatPixel: string;
  tiktokPixel: string;
}
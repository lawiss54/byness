import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { cache } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiProvider } from '@/lib/apiContext';
import ApiBootstrap from '@/components/apiBootstrap';
import { CartCheckoutProvider } from '@/lib/CartCheckoutContext';
import TrackingScripts from '@/components/shared/TrackingScripts';

import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: settings?.data?.settings?.siteName || 'Loading....',
    description:
      settings?.data?.settings?.siteDescription ||
      'Experience luxury and elegance with our premium brand collection',
    keywords: settings?.keywords || ['luxury', 'premium', 'brand', 'elegant', 'quality'],
    authors: [{ name: settings?.author || 'By Ness' }],
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    icons: {
      icon: settings?.data?.settings?.siteIcon || '/favicon.ico',
      shortcut: settings?.data?.settings?.siteIcon || '/favicon.ico',
      apple: settings?.data?.settings?.siteIcon || '/apple-touch-icon.png',
    },
    openGraph: {
      title: settings?.data?.settings?.siteName || 'By Ness - Premium Experience',
      description:
        settings?.data?.settings?.siteDescription ||
        'Découvrez le luxe et l’élégance avec notre collection de marques premium.',
      siteName: settings?.data?.settings?.siteName || 'By Ness',
      images: [
        {
          url: settings?.data?.settings?.siteLogo || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: settings?.data?.settings?.siteName || 'By Ness',
        },
      ],
      type: 'website',
      locale: 'fr',
    },
    other: {
      phone: settings?.data?.settings?.contactPhone || '+213 555 00 00 00',
      social: {
        facebook: settings?.data?.socialmedia?.facebook || 'https://facebook.com/bynessdz',
        instagram: settings?.data?.socialmedia?.instagram || 'https://instagram.com/byness.dz',
        tiktok: settings?.data?.socialmedia?.tiktok || 'https://tiktok.com/@bynessdz',
        whatsapp: settings?.data?.socialmedia?.whatsapp || 'https://wa.me/213555000000',
      },
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settingsData = await getSiteSettings();
  const pixelSettings = settingsData?.data?.pixel;
  const dataSettings = settingsData?.data;

  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen font-secondary antialiased bg-brand-ivory-200 text-brand-greenBlack-500 selection:bg-brand-sage-200 selection:text-brand-greenBlack-700">
        <div className="min-h-screen flex flex-col flex-grow">
          <Analytics />
          <ApiProvider>
            <CartCheckoutProvider>
              {/*  السكربتات الإعلانية */}
              <TrackingScripts settings={pixelSettings} />

              <Header />
              <main className="flex-1 flex-grow">
                <ApiBootstrap />
                {children}
              </main>
              <Footer data={dataSettings} />
            </CartCheckoutProvider>
          </ApiProvider>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </body>
    </html>
  );
}

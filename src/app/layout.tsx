import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiProvider } from '@/lib/apiContext';
import ApiBootstrap from '@/components/apiBootstrap';
import { CartCheckoutProvider } from '@/lib/CartCheckoutContext';
import TrackingScripts from '@/components/shared/TrackingScripts';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'By Ness - Boutique premium pour femmes',
  description: 'Découvrez le luxe et l’élégance avec notre collection de marques premium.',
  keywords: ['byness', 'vêtements femme', 'algérie', 'premium', 'mode', 'luxe'],
  authors: [{ name: 'By Ness' }],
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'By Ness - Boutique premium pour femmes',
    description: 'Explorez les tendances féminines haut de gamme avec By Ness.',
    siteName: 'By Ness',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'By Ness',
      },
    ],
    type: 'website',
    locale: 'fr',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen font-secondary antialiased bg-brand-ivory-200 text-brand-greenBlack-500 selection:bg-brand-sage-200 selection:text-brand-greenBlack-700">
        <div className="min-h-screen flex flex-col flex-grow">
          <Analytics />
          <ApiProvider>
            <CartCheckoutProvider>
              <TrackingScripts settings={null} />
              <Header />
              <main className="flex-1 flex-grow">
                <ApiBootstrap />
                {children}
              </main>
              {/* تمرير بيانات ثابتة إلى Footer */}
              <Footer
                data={{
                  settings: {
                    contactPhone: '+213 555 00 00 00',
                    contactMail: 'contact@byness.dz',
                  },
                  socialmedia: {
                    facebook: 'https://facebook.com/bynessdz',
                    instagram: 'https://instagram.com/byness.dz',
                    tiktok: 'https://tiktok.com/@bynessdz',
                    whatsapp: 'https://wa.me/213555000000',
                  },
                }}
              />
            </CartCheckoutProvider>
          </ApiProvider>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </body>
    </html>
  );
}

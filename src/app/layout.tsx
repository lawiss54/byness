import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import LinkLoader from '@/components/shared/LinkLouder';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiProvider } from '@/lib/apiContext';
import { CartCheckoutProvider } from '@/lib/CartCheckoutContext';
import TrackingScripts from '@/components/shared/TrackingScripts';
import ScrollToTop from '@/components/shared/ScrollToTop';
import { Metadata } from 'next';
import ApiBootstrap from '@/components/apiBootstrap';
import DeleyGoogleAnalytics from '@/components/DeleyGoogleAnalytics';


async function getSettings() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`, {
       method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch settings: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    const fallbackSettings = {
      siteName: 'By Ness',
      title: 'By Ness - Boutique premium pour femmes',
      description: "Découvrez le luxe et l'élégance avec notre collection de marques premium.",
      keywords: ['byness', 'vêtements femme', 'algérie', 'premium', 'mode', 'luxe'],
      ogImage: '/og-image.jpg',
      locale: 'fr',
      contactPhone: '+213 555 00 00 00',
      contactMail: 'contact@byness.dz',
      socialmedia: {
        facebook: 'https://facebook.com/bynessdz',
        instagram: 'https://instagram.com/byness.dz',
        tiktok: 'https://tiktok.com/@bynessdz',
        whatsapp: 'https://wa.me/213555000000',
      },
    };
    return fallbackSettings;
  }
}

export async function generateMetadata(): Promise<Metadata> {
 
  const settings = await getSettings();
  const metadata = {
    title: settings.settings?.siteName || "By Ness - Boutique premium pour femmes",
    description: settings.settings?.siteDescription || "Découvrez le luxe et l'élégance avec notre collection de marques premium.",
    keywords: settings.settings?.keywords || ['byness', 'vêtements femme', 'algérie', 'premium', 'mode', 'luxe'],
    authors: [{ name: settings.settings?.siteName || 'By Ness' }],
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
     category: 'Store',
    icons: {
      icon: settings.settings?.siteIcon,
      shortcut: settings.settings?.siteIcon,
      apple: settings.settings?.siteIcon,
    },
    openGraph: {
      title: settings.settings?.siteName || 'By Ness - Boutique premium pour femmes',
      description: settings.settings?.siteDescription || 'Explorez les tendances féminines haut de gamme avec By Ness.',
      siteName: settings.settings?.siteName || 'By Ness',
      images: [
        {
          url: settings.settings?.siteLogo || '/logo.png',
          width: 1200,
          height: 630,
          alt: settings.settings?.siteName || 'By Ness',
        },
      ],
      type: 'website',
      locale: settings.settings?.locale || 'fr',
    },
  };

  return metadata;
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
  const settings = await getSettings();

 
  return (
    <html lang="fr" className="scroll-smooth">
      
        <DeleyGoogleAnalytics gaId={settings?.pixel?.googleAnalytics} />
      
      <body className="min-h-screen font-secondary antialiased bg-brand-ivory-200 text-brand-greenBlack-500 selection:bg-brand-sage-200 selection:text-brand-greenBlack-700">
        <div className="min-h-screen flex flex-col flex-grow">
          <Analytics />
          <ApiProvider>
            <CartCheckoutProvider>
              <TrackingScripts pixels={settings?.pixel} />
              <Header image={{logo: settings.settings?.siteLogo || '/logo.png'}} />
             {/* <ScrollToTop />  />
*/}
              <main className="min-h-screen flex-1 flex-grow">
                <ApiBootstrap />
                <LinkLoader />
                {children}
              </main>
              {/* تمرير بيانات ديناميكية إلى Footer */}
              <Footer
                data={{
                  settings: {
                    contactPhone: settings?.settings?.contactPhone || '+213 555 00 00 00',
                    contactMail: settings?.settings?.contactEmail || 'contact@byness.dz',
                  },
                  socialmedia: settings?.socialmedia || {
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
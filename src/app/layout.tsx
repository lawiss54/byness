import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiProvider } from '@/lib/apiContext';
import { CartCheckoutProvider } from '@/lib/CartCheckoutContext';
import TrackingScripts from '@/components/shared/TrackingScripts';
import { Metadata } from 'next';
import ApiBootstrap from '@/components/apiBootstrap';

// دالة لجلب إعدادات الموقع
async function getSettings() {
  try {
    // يمكنك استبدال هذا بـ API call حقيقي
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`, {
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch settings');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching settings:', error);
    // إرجاع بيانات افتراضية في حالة الخطأ
    return {
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
  }
}

// دالة لتوليد metadata ديناميكية
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  console.log(settings)

  return {
    title: settings.title || "By Ness - Boutique premium pour femmes",
    description: settings.description || "Découvrez le luxe et l'élégance avec notre collection de marques premium.",
    keywords: settings.keywords || ['byness', 'vêtements femme', 'algérie', 'premium', 'mode', 'luxe'],
    authors: [{ name: settings.siteName || 'By Ness' }],
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      title: settings.title || 'By Ness - Boutique premium pour femmes',
      description: settings.description || 'Explorez les tendances féminines haut de gamme avec By Ness.',
      siteName: settings.siteName || 'By Ness',
      images: [
        {
          url: settings.ogImage || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: settings.siteName || 'By Ness',
        },
      ],
      type: 'website',
      locale: settings.locale || 'fr',
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
  // جلب الإعدادات للـ Footer
  const settings = await getSettings();

  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen font-secondary antialiased bg-brand-ivory-200 text-brand-greenBlack-500 selection:bg-brand-sage-200 selection:text-brand-greenBlack-700">
        <div className="min-h-screen flex flex-col flex-grow">
          <Analytics />
          <ApiProvider>
            <CartCheckoutProvider>
              <TrackingScripts settings={null} />
              <Header />
              <main className="min-h-screen flex-1 flex-grow">
                <ApiBootstrap />
                {children}
              </main>
              {/* تمرير بيانات ديناميكية إلى Footer */}
              <Footer
                data={{
                  settings: {
                    contactPhone: settings.contactPhone || '+213 555 00 00 00',
                    contactMail: settings.contactMail || 'contact@byness.dz',
                  },
                  socialmedia: settings.socialmedia || {
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
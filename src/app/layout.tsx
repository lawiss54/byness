import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiProvider } from '@/lib/apiContext';
import ApiBootstrap from '@/components/apiBootstrap';
import { CartCheckoutProvider } from '@/lib/CartCheckoutContext';


// app/layout.tsx أو app/(main)/layout.tsx

import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/api'; // ← سنكتبه بعد قليل

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  console.log(settings)

  return {
    title: settings?.data?.settings?.siteName || 'Loading....',
    description: settings?.data?.settings?.siteDescription || 'Experience luxury and elegance with our premium brand collection',
    keywords: settings?.keywords || ['luxury', 'premium', 'brand', 'elegant', 'quality'],
    authors: [{ name: settings?.author || 'By Ness' }],
    robots: 'index, follow',
    openGraph: {
      title: settings?.data?.settings?.siteName || 'By Ness - Premium Experience',
      description: settings?.data?.settings?.siteDescription || 'Experience luxury and elegance with our premium brand collection',
      type: 'website',
      locale: 'fr',
    },
    facebook: {
      card: 'summary_large_image',
      title: settings?.twitter_title || 'By Ness - Premium Experience',
      description: settings?.twitter_description || 'Experience luxury and elegance with our premium brand collection',
    },
  };
}


export const viewport = {
  width: "device-width",
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
              <Header />
              <main className="flex-1 flex-grow">
                <ApiBootstrap />
                {children}
              </main>
              <Footer />
            </CartCheckoutProvider>
          </ApiProvider>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </body>
    </html>
  );
}
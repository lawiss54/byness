import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from '@/components/cart/CartContext';



export const metadata: Metadata = {
  title: "By Ness - Premium Experience",
  description: "Experience luxury and elegance with our premium brand collection",
  keywords: ["luxury", "premium", "brand", "elegant", "quality"],
  authors: [{ name: "Your Brand Team" }],
  robots: "index, follow",
  openGraph: {
    title: "Your Brand - Premium Experience",
    description: "Experience luxury and elegance with our premium brand collection",
    type: "website",
    locale: "fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Brand - Premium Experience",
    description: "Experience luxury and elegance with our premium brand collection",
  },
};

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
      <body className="font-secondary antialiased bg-brand-ivory-200 text-brand-greenBlack-500 selection:bg-brand-sage-200 selection:text-brand-greenBlack-700">
        <div className="min-h-screen flex flex-col">
          <CartProvider>
            <Header /> 
              {children}
            <Footer /> 
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
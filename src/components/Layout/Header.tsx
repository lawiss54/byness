"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCartCheckout } from "@/lib/CartCheckoutContext";
import { useRouter } from "next/navigation";

export default function Header() {


  const { itemCount } = useCartCheckout()
  const router = useRouter();

  const goHome = () => {
    router.push('/')
  }


  return (
    <header className="h-16 w-full bg-brand-greenBlack-500 text-white sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-3 h-full cursor-pointer" onClick={goHome}>
          <div className="text-lg font-bold flex items-center h-full">
            <Image
              src="/logo.png"
              alt="Logo ByNess Store"
              width="50"
              height="50"
              priority
            />
          </div>
          <h1 className="text-brand-sage-500 text-4xl font-bold flex items-center h-full">
            ByNess
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 h-full">
          <Link
            href="/"
            className="hover:text-brand-sage-500 transition-colors duration-200 font-medium flex items-center h-full"
          >
            Accueil
          </Link>
          <Link
            href="/boutique"
            className="hover:text-brand-sage-500 transition-colors duration-200 font-medium flex items-center h-full"
          >
            Boutique
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 h-full">
          {/* Shopping Cart */}
          <Link
            href="/panier"
            prefetch={true}
            
            className="relative group transition-all duration-300 ease-out p-3 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border border-white/30 hover:from-white/30 hover:to-white/20 hover:border-white/40 hover:scale-110 hover:-translate-y-0.5 flex items-center justify-center shadow-xl hover:shadow-2xl"
          >
            <ShoppingCart
              size={18}
              className="text-white group-hover:text-brand-camel-100 transition-all duration-200"
            />
            <span className="sr-only">Panier</span>

            {/* Cart Items Count */}
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold shadow-lg ring-2 ring-white/60 animate-pulse">
                {itemCount}
              </span>
            )}
            

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-camel-400/20 to-brand-camel-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </Link>
        </div>
      </div>
    </header>
  );
}

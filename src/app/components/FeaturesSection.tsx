import { Truck, ShieldCheck, HandCoins } from "lucide-react";

export default function FeaturesSection() {
  return (
    <div className="bg-brand-sage-500 px-4 h-40 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="text-lg md:text-2xl font-bold text-brand-camel-900">
            Pourquoi nous choisir ?
          </h2>
        </div>

        {/* Features - Side by Side */}
        <div className="flex flex-row justify-center items-center gap-4 md:gap-16">
          
          {/* Livraison rapide */}
          <div className="flex flex-col items-center text-center flex-1">
            <Truck className="w-6 h-6 md:w-10 md:h-10 text-brand-camel-900 mb-1 md:mb-2" />
            <h3 className="text-xs md:text-base font-semibold text-brand-darkGreen-900">
              Livraison rapide
            </h3>
          </div>

          {/* Qualité garantie */}
          <div className="flex flex-col items-center text-center flex-1">
            <ShieldCheck className="w-6 h-6 md:w-10 md:h-10 text-brand-camel-900 mb-1 md:mb-2" />
            <h3 className="text-xs md:text-base font-semibold text-brand-darkGreen-900">
              Qualité garantie
            </h3>
          </div>

          {/* Paiement à la livraison */}
          <div className="flex flex-col items-center text-center flex-1">
            <HandCoins className="w-6 h-6 md:w-10 md:h-10 text-brand-camel-900 mb-1 md:mb-2" />
            <h3 className="text-xs md:text-base font-semibold text-brand-darkGreen-900">
              Paiement à la livraison
            </h3>
          </div>

        </div>
      </div>
    </div>
  );
}
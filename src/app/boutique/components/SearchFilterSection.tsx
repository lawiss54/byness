import { Search } from "lucide-react";
export default function SearchFilterSection() {

    return(
        <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-sage-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-darkGreen-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-brand-sage-200 focus:border-brand-camel-500 focus:ring-4 focus:ring-brand-camel-500/10 transition-all duration-300 bg-white/80"
              />
            </div>

          </div>
        </div>
      </section>
    );
}
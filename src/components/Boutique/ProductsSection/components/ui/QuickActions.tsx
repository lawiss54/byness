import { memo } from 'react';
import { Eye } from 'lucide-react';

export const QuickActions = memo(() => (
  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
    <button 
      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:bg-brand-camel-50 hover:text-brand-camel-600 transition-all duration-200"
      aria-label="Aperçu rapide"
    >
      <Eye className="w-4 h-4" />
    </button>
  </div>
));

QuickActions.displayName = 'QuickActions';

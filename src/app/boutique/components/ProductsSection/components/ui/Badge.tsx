
import { memo } from 'react';

interface BadgeProps {
  type: 'new' | 'sale';
  discount?: number;
  className?: string;
}

export const Badge = memo(({ type, discount, className = "" }: BadgeProps) => {
  const config = {
    new: { bg: 'bg-brand-camel-500', text: 'جديد' },
    sale: { bg: 'bg-red-500', text: discount ? `-${discount}%` : 'تخفيض' }
  };

  return (
    <span className={`${config[type].bg} text-white text-xs px-2 py-1 rounded-full font-medium ${className}`}>
      {config[type].text}
    </span>
  );
});

Badge.displayName = 'Badge';
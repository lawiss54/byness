
import { memo } from 'react';

interface ColorPaletteProps {
  colors: string[];
}

export const ColorPalette = memo(({ colors }: ColorPaletteProps) => (
  <div className="flex items-center gap-1">
    {colors.slice(0, 4).map((color, index) => (
      <div
        key={index}
        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
        style={{ backgroundColor: color }}
      />
    ))}
    {colors.length > 4 && (
      <span className="text-xs text-gray-500 mr-1">
        +{colors.length - 4}
      </span>
    )}
  </div>
));

ColorPalette.displayName = 'ColorPalette';

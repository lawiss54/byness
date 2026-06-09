'use client';

import { Upload, X } from 'lucide-react';
import { Card } from '@/components/shared/ui';
import Image from 'next/image';

interface ImagesSectionProps {
  images: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

/**
 * Images upload and management section
 */
export default function ImagesSection({ 
  images, 
  onImageUpload, 
  onRemoveImage 
}: ImagesSectionProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Ajouter des images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
          </label>
          <span className="text-sm text-gray-500">
            Formats acceptés: JPG, PNG, WebP | Size: 10 MB
          </span>
        </div>
        
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Product ${index + 1}`}
                  width={300}
                  height={128}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => onRemoveImage(index)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

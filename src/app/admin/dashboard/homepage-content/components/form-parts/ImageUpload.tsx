import type React from "react"
import { Upload } from 'lucide-react'
import { Button } from '@/components/Dashboard/HomeHeroSection'

interface ImageUploadProps {
  watchedImage: string | null | undefined;
  onImageUpload: (file: File) => void;
  onRemoveImage: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ watchedImage, onImageUpload, onRemoveImage }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Image </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-blue-400 transition-colors">
        {watchedImage ? (
          <div className="space-y-4">
            <img
              src={watchedImage || "/placeholder.svg"}
              alt="Aperçu"
              className="max-h-32 sm:max-h-40 mx-auto rounded-lg"
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={onRemoveImage}
            >
              Supprimer l'image
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-gray-400" />
            <div>
              <label className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-700 text-sm sm:text-base">
                  Choisir un fichier
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) onImageUpload(file)
                  }}
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP, AVIF jusqu'à 15MB</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

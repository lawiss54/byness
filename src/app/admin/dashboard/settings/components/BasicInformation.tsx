import { Store, Upload, X } from "lucide-react";
import { StoreGeneral } from "../types";
import { Input } from "@/components/shared/ui";
import { useRef } from "react";

interface BasicInformationProps {
  settings: StoreGeneral;
  handleInputChange: (field: keyof StoreGeneral, value: string) => void;
}

export default function BasicInformation({ settings, handleInputChange }: BasicInformationProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);

  // Vérification de la présence de handleInputChange
  if (!handleInputChange || typeof handleInputChange !== 'function') {
    console.error('handleInputChange n\'est pas fourni ou n\'est pas une fonction');
    return <div>Erreur: fonction handleInputChange manquante</div>;
  }

  // Conversion du fichier en base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (field: keyof StoreGeneral, file: File | null) => {
    if (file) {
      try {
        // Conversion de l'image en base64
        const base64String = await convertToBase64(file);
        console.log(`Téléchargement ${field}:`, base64String.substring(0, 50) + '...');
        handleInputChange(field, base64String);
      } catch (error) {
        console.error('Erreur lors de la conversion du fichier en base64:', error);
      }
    }
  };

  // Fonction séparée pour supprimer siteLogo
  const clearLogo = () => {
    try {
      // Nettoyage de l'input file
      if (logoInputRef.current) {
        logoInputRef.current.value = '';
      }
      // Nettoyage de la valeur dans l'état
      console.log('Suppression siteLogo');
      handleInputChange('siteLogo', '');
    } catch (error) {
      console.error('Erreur dans clearLogo:', error);
    }
  };

  // Fonction séparée pour supprimer siteIcon
  const clearIcon = () => {
    try {
      // Nettoyage de l'input file
      if (iconInputRef.current) {
        iconInputRef.current.value = '';
      }
      // Nettoyage de la valeur dans l'état
      console.log('Suppression siteIcon');
      handleInputChange('siteIcon', '');
    } catch (error) {
      console.error('Erreur dans clearIcon:', error);
    }
  };

  // Vérification du type d'image et retour du chemin approprié
  const getImageSrc = (imagePath: File | string | undefined): string | null => {
    if (!imagePath) return null;
    
    // Si c'est un objet File (rare dans ce contexte)
    if (imagePath instanceof File) {
      return URL.createObjectURL(imagePath);
    }
    
    // Si l'image est en base64 (nouvelle image téléchargée)
    if (typeof imagePath === 'string' && imagePath.startsWith('data:image/')) {
      return imagePath;
    }
    
    // Si l'image est un lien complet (de Laravel API ou CDN)
    // Laravel API envoie le lien complet donc pas besoin de traitement supplémentaire
    return typeof imagePath === 'string' ? imagePath : null;
  };

  const ImagePreview = ({ src, alt, onClear }: { src: string; alt: string; onClear: () => void }) => (
    <div className="relative inline-block">
      <img 
        src={src} 
        alt={alt} 
        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
        onError={(e) => {
          // En cas d'échec du chargement de l'image
          console.error('Erreur lors du chargement de l\'image:', src);
        }}
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClear();
        }}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors z-10"
        title="Supprimer l'image"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Store className="w-5 h-5" />
          <span>Informations sur la boutique</span>
        </h2>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de la boutique
            </label>
            <Input 
              type="text"
              value={settings?.siteName || ''}
              onChange={(e) => handleInputChange('siteName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-mail de contact
          </label>
          <Input
            value={settings?.contactEmail || ''}
            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Numéro de téléphone
          </label>
          <Input
            value={settings?.contactPhone || ''}
            onChange={(e) => handleInputChange('contactPhone', e.target.value)}
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresse
          </label>
          <textarea
            value={settings?.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description de la boutique
          </label>
          <textarea
            value={settings?.siteDescription || ''}
            onChange={(e) => handleInputChange('siteDescription', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Logo Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo
          </label>
          <div className="space-y-3">
            {getImageSrc(settings?.siteLogo) && (
              <ImagePreview 
                src={getImageSrc(settings.siteLogo)!} 
                alt="Logo de la boutique"
                onClear={clearLogo}
              />
            )}
            <div className="flex items-center space-x-3">
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileChange('siteLogo', file);
                  }
                }}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choisir un logo
              </label>
              <span className="text-sm text-gray-500">
                PNG, JPG jusqu'à 15MB
              </span>
            </div>
          </div>
        </div>

        {/* Favicon Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Favicon
          </label>
          <div className="space-y-3">
            {getImageSrc(settings?.siteIcon) && (
              <ImagePreview 
                src={getImageSrc(settings.siteIcon)!} 
                alt="Favicon"
                onClear={clearIcon}
              />
            )}
            <div className="flex items-center space-x-3">
              <input
                ref={iconInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileChange('siteIcon', file);
                  }
                }}
                className="hidden"
                id="icon-upload"
              />
              <label
                htmlFor="icon-upload"
                className="inline-flex items-components px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choisir un favicon
              </label>
              <span className="text-sm text-gray-500">
                ICO, PNG 16x16 ou 32x32
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
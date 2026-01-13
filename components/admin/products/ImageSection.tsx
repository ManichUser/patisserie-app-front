// components/admin/products/ImageSection.tsx
'use client';

import { Upload, Trash2, Star } from 'lucide-react';
import Image from 'next/image';

interface ProductImage {
  id?: string;
  url?: string;
  file?: File;
  preview: string;
  isFeatured: boolean;
  order?: number;
}

interface ImageSectionProps {
  images: ProductImage[];
  onImagesChange: (images: ProductImage[]) => void;
  error?: string;
}

export function ImageSection({ images, onImagesChange, error }: ImageSectionProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    const newImages = files.map((file, index) => ({
      file,
      preview: URL.createObjectURL(file),
      isFeatured: images.length === 0 && index === 0,
      order: images.length + index,
    }));

    onImagesChange([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    
    // Si c'est l'image principale, définir la suivante comme principale
    if (newImages[index].isFeatured && newImages.length > 1) {
      const nextIndex = index === 0 ? 1 : 0;
      newImages[nextIndex].isFeatured = true;
    }
    
    newImages.splice(index, 1);
    onImagesChange(newImages);
  };

  const setFeaturedImage = (index: number) => {
    onImagesChange(
      images.map((img, i) => ({
        ...img,
        isFeatured: i === index,
      }))
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-1">Images du produit</h2>
      <p className="text-sm text-gray-500 mb-6">
        Ajoutez jusqu'à 10 images. La première sera l'image principale.
      </p>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden group border-2 border-gray-200 hover:border-blue-500 transition-all"
          >
            <div className="relative w-full h-full">
              <Image
                src={img.preview || img.url || ''}
                alt={`Product ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setFeaturedImage(index)}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                    img.isFeatured
                      ? 'bg-yellow-500 text-white'
                      : 'bg-white/90 text-gray-700 hover:bg-white'
                  }`}
                >
                  <Star className={`w-3 h-3 ${img.isFeatured ? 'fill-current' : ''}`} />
                  {img.isFeatured ? 'Principal' : 'Définir'}
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Badge principal */}
            {img.isFeatured && (
              <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3 fill-current" />
                Principal
              </div>
            )}
          </div>
        ))}

        {/* Upload button */}
        {images.length < 10 && (
          <label className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-600 hover:bg-blue-50/50 transition-all group">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center mb-2 transition-colors">
              <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">
              Ajouter
            </span>
            <span className="text-xs text-gray-400 mt-1">
              {images.length}/10
            </span>
          </label>
        )}
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-xl">
        <p className="text-xs text-blue-700 leading-relaxed">
          💡 <strong>Conseil:</strong> Utilisez des images de haute qualité (min 800x800px). 
          Formats acceptés: JPG, PNG, WebP (max 5MB par image).
        </p>
      </div>
    </div>
  );
}
'use client';

import { Image as ImageIcon, Video } from 'lucide-react';

interface MediaPreviewProps {
  type: 'image' | 'video';
  url: string;
  caption: string;
  onCaptionChange: (caption: string) => void;
}

export function MediaPreview({ type, url, caption, onCaptionChange }: MediaPreviewProps) {
  return (
    <div className="space-y-4">
      {/* Media Display */}
      <div className="relative rounded-lg overflow-hidden border-2 border-gray-200">
        {type === 'image' ? (
          <img
            src={url}
            alt="Preview"
            className="w-full h-64 object-cover"
          />
        ) : (
          <video
            src={url}
            controls
            className="w-full h-64 object-cover"
          />
        )}
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 bg-black/70 text-white text-xs font-medium rounded-lg flex items-center gap-2">
          {type === 'image' ? (
            <>
              <ImageIcon className="w-4 h-4" />
              <span>Image</span>
            </>
          ) : (
            <>
              <Video className="w-4 h-4" />
              <span>Vidéo</span>
            </>
          )}
        </div>
      </div>

      {/* Caption Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Légende (optionnelle)
        </label>
        <textarea
          value={caption}
          onChange={(e) => onCaptionChange(e.target.value)}
          placeholder="Ajoutez une description..."
          rows={3}
          maxLength={1024}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-600">
            Ajoutez du texte à votre média
          </p>
          <span className="text-xs text-gray-500">
            {caption.length} / 1024
          </span>
        </div>
      </div>
    </div>
  );
}
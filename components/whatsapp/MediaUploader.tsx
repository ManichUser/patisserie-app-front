'use client';

import { useState } from 'react';
import { Upload, Link2, X, Image as ImageIcon, Video } from 'lucide-react';

interface MediaUploaderProps {
  type: 'image' | 'video';
  onMediaSelect: (url: string, file?: File) => void;
  currentMedia?: string;
}

export function MediaUploader({ type, onMediaSelect, currentMedia }: MediaUploaderProps) {
  const [mode, setMode] = useState<'url' | 'upload'>('url');
  const [urlInput, setUrlInput] = useState('');

  const accept = type === 'image' 
    ? 'image/jpeg,image/png,image/gif,image/webp'
    : 'video/mp4,video/quicktime';

  const maxSize = type === 'image' ? 5 : 16; // MB

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`Le fichier dépasse ${maxSize}MB`);
      return;
    }

    const url = URL.createObjectURL(file);
    onMediaSelect(url, file);
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onMediaSelect(urlInput.trim());
      setUrlInput('');
    }
  };

  const Icon = type === 'image' ? ImageIcon : Video;

  return (
    <div className="space-y-4">
      {/* Mode Selector */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            mode === 'url'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Link2 className="w-4 h-4 inline mr-2" />
          URL
        </button>
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            mode === 'upload'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Upload className="w-4 h-4 inline mr-2" />
          Upload
        </button>
      </div>

      {/* URL Mode */}
      {mode === 'url' && (
        <div>
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
              placeholder={`https://example.com/${type === 'image' ? 'image.jpg' : 'video.mp4'}`}
              className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              OK
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Collez l'URL directe du {type === 'image' ? 'image' : 'vidéo'}
          </p>
        </div>
      )}

      {/* Upload Mode */}
      {mode === 'upload' && (
        <label className="block">
          <input
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <Icon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-900 mb-1">
              Cliquez pour sélectionner
            </p>
            <p className="text-xs text-gray-600">
              Max {maxSize}MB • {type === 'image' ? 'JPG, PNG, GIF, WebP' : 'MP4, MOV'}
            </p>
          </div>
        </label>
      )}

      {/* Current Media */}
      {currentMedia && (
        <div className="relative">
          <button
            type="button"
            onClick={() => onMediaSelect('')}
            className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
          {type === 'image' ? (
            <img
              src={currentMedia}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
            />
          ) : (
            <video
              src={currentMedia}
              controls
              className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
            />
          )}
        </div>
      )}
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Radio, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { MediaUploader } from './MediaUploader';
import { MediaPreview } from './MediaPreview';

export function StatusPublisher() {
  const [statusType, setStatusType] = useState<'text' | 'media'>('text');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [message, setMessage] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      let endpoint = '';
      let body: any = {};

      if (statusType === 'text') {
        endpoint = '/api/whatsapp/status/text';
        body = { message };
      } else {
        endpoint = `/api/whatsapp/status/${mediaType}`;
        body = {
          [`${mediaType}Url`]: mediaUrl,
          caption: caption || undefined,
        };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erreur de publication');
      }

      setSuccess(true);
      
      // Reset after 2s
      setTimeout(() => {
        setMessage('');
        setMediaUrl('');
        setCaption('');
        setSuccess(false);
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Type Selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Type de statut
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setStatusType('text')}
            className={`p-4 border-2 rounded-lg transition-all ${
              statusType === 'text'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="font-medium text-gray-900">💬 Texte</p>
            <p className="text-xs text-gray-600 mt-1">Message simple</p>
          </button>
          <button
            type="button"
            onClick={() => setStatusType('media')}
            className={`p-4 border-2 rounded-lg transition-all ${
              statusType === 'media'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="font-medium text-gray-900">🖼️ Média</p>
            <p className="text-xs text-gray-600 mt-1">Image ou vidéo</p>
          </button>
        </div>
      </div>

      {/* Text Status */}
      {statusType === 'text' && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez votre statut..."
            rows={6}
            maxLength={700}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
            disabled={loading}
            required
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-600">
              Visible 24h par vos contacts
            </p>
            <span className="text-xs text-gray-500">
              {message.length} / 700
            </span>
          </div>
        </div>
      )}

      {/* Media Status */}
      {statusType === 'media' && (
        <div className="space-y-4">
          {/* Media Type */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => setMediaType('image')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                mediaType === 'image'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📷 Image
            </button>
            <button
              type="button"
              onClick={() => setMediaType('video')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                mediaType === 'video'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🎥 Vidéo
            </button>
          </div>

          {/* Uploader */}
          {!mediaUrl ? (
            <MediaUploader
              type={mediaType}
              onMediaSelect={setMediaUrl}
              currentMedia={mediaUrl}
            />
          ) : (
            <MediaPreview
              type={mediaType}
              url={mediaUrl}
              caption={caption}
              onCaptionChange={setCaption}
            />
          )}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-900">Statut publié !</p>
            <p className="text-xs text-green-700 mt-0.5">Visible par vos contacts pendant 24h</p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-900">Erreur</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || (statusType === 'text' ? !message : !mediaUrl)}
        className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Publication...</span>
          </>
        ) : (
          <>
            <Radio className="w-5 h-5" />
            <span>Publier le statut</span>
          </>
        )}
      </button>
    </form>
  );
}
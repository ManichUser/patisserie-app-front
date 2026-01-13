'use client';

import { useState, useEffect } from 'react';
import { StatusBadge } from './StatusBadge';
import { Power, PowerOff } from 'lucide-react';

export function Header() {
  const [status, setStatus] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected');
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  // Fetch status on mount
  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/whatsapp/status');
      const data = await res.json();
      setStatus(data.isConnected ? 'connected' : 'disconnected');
      setPhoneNumber(data.phoneNumber);
    } catch (error) {
      setStatus('disconnected');
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      {/* Left: Status */}
      <div className="flex items-center gap-4">
        <StatusBadge status={status} />
        {phoneNumber && (
          <span className="hidden sm:inline text-sm text-gray-600">
            {phoneNumber}
          </span>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {status === 'connected' ? (
          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <PowerOff className="w-5 h-5" />
          </button>
        ) : (
          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
            <Power className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
}
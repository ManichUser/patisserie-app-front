'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { APP_NAME, APP_TAGLINE, ROUTES, STORAGE_KEYS } from '@/lib/constants';

export default function LaunchScreen() {
  const router = useRouter();

  useEffect(() => {
    // Vérifier si l'onboarding a été complété
    const onboardingCompleted = localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
    const authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

    // Simuler un délai de chargement
    const timer = setTimeout(() => {
      if (!onboardingCompleted) {
        router.push(ROUTES.ONBOARDING);
      } else if (!authToken) {
        router.push(ROUTES.LOGIN);
      } else {
        router.push(ROUTES.HOME);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-linear-to-br from-amber-900 via-amber-700 to-amber-600 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Logo container */}
      <div className="relative z-10 flex flex-col items-center gap-8 animate-fade-in">
        {/* Logo icon - Cupcake */}
        <div className="relative">
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse-slow">
            <img src="logo.png" alt="Logo" className="w-full h-full rounded-4xl" />
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl animate-pulse"></div>
        </div>

        {/* App name */}
        <div className="text-center space-y-3">
          <h1 className="font-display text-5xl font-bold text-white tracking-tight animate-slide-up">
            {APP_NAME}
          </h1>
          
          <p className="text-white/80 text-lg font-light tracking-wide animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {APP_TAGLINE}
          </p>
        </div>

        {/* Loading indicator */}
        <div className="flex flex-col items-center gap-3 mt-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          
          <p className="text-white/60 text-sm">Chargement...</p>
        </div>
      </div>

      {/* Version */}
      <div className="absolute flex flex-col items-center bottom-8 text-white/40 text-sm">
       <span> BizSmart Version 1.0.0</span>
       <span>By ManiX </span>
      </div>
      
    </main>
  );
}
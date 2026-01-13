// src/app/onboarding/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingSlide } from '@/components/onboarding/OnboardingSlide';
import { OnboardingDots } from '@/components/onboarding/OnboardingDots';
import { Button } from '@/components/ui/Button3';
import { ONBOARDING_SLIDES, ROUTES, STORAGE_KEYS } from '@/lib/constants';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLastSlide = currentSlide === ONBOARDING_SLIDES.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      // Marquer l'onboarding comme complété
      localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
      router.push(ROUTES.REGISTER);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
    router.push(ROUTES.REGISTER);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Skip button */}
      <div className="flex absolute top-0 right-0 z-50 justify-end p-6">
        <button
          onClick={handleSkip}
          className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
        >
          Passer
        </button>
      </div>

      {/* Slides */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className="flex h-screen transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {ONBOARDING_SLIDES.map((slide) => (
            <div key={slide.id} className="w-full h-full shrink-0">
              <OnboardingSlide slide={slide} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 fixed mt-4 bottom-0 w-screen space-y-6 ">
        {/* Dots indicator */}
        <div className="flex justify-center">
          <OnboardingDots
            totalSlides={ONBOARDING_SLIDES.length}
            currentSlide={currentSlide}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          {currentSlide > 0 && (
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrevious}
              className="shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleNext}
            className="flex-1"
          >
            {isLastSlide ? 'Commencer' : 'Suivant'}
            {!isLastSlide && <ChevronRight className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </main>
  );
}
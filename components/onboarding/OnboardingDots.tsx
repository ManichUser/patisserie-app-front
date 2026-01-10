import React from 'react';
import { clsx } from 'clsx';

interface OnboardingDotsProps {
  totalSlides: number;
  currentSlide: number;
}

export const OnboardingDots: React.FC<OnboardingDotsProps> = ({
  totalSlides,
  currentSlide,
}) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className={clsx(
            'h-2 rounded-full transition-all duration-300',
            index === currentSlide
              ? 'w-8 bg-amber-700'
              : 'w-2 bg-gray-300'
          )}
        />
      ))}
    </div>
  );
};
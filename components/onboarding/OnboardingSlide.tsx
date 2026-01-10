import React from 'react';
import { OnboardingSlide as SlideType } from '@/lib/types';
import Image from 'next/image';

interface OnboardingSlideProps {
  slide: SlideType;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ slide }) => {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center px-8 py-12 transition-all duration-500"
      style={{ backgroundColor: slide.backgroundColor }}
    >
      {/* Image */}
      <div className="relative w-full max-w-sm aspect-square mb-12 animate-fade-in">
        <div className="absolute inset-0 bg-linear-to-br from-amber-200/20 to-transparent rounded-3xl"></div>
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center space-y-4 animate-slide-up">
        <h2 className="font-display text-3xl font-bold text-gray-900 max-w-md">
          {slide.title}
        </h2>
        
        <p className="text-gray-600 text-lg leading-relaxed max-w-sm">
          {slide.description}
        </p>
      </div>
    </div>
  );
};
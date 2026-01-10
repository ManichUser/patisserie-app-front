// src/components/ui/Avatar.tsx

import React from 'react';
import { clsx } from 'clsx';

interface AvatarProps {
  email: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-16 h-16 text-xl',
  lg: 'w-24 h-24 text-3xl',
  xl: 'w-32 h-32 text-4xl',
};

const colors = [
  'bg-gradient-to-br from-blue-500 to-blue-600',
  'bg-gradient-to-br from-green-500 to-green-600',
  'bg-gradient-to-br from-purple-500 to-purple-600',
  'bg-gradient-to-br from-pink-500 to-pink-600',
  'bg-gradient-to-br from-amber-500 to-amber-600',
  'bg-gradient-to-br from-red-500 to-red-600',
  'bg-gradient-to-br from-indigo-500 to-indigo-600',
  'bg-gradient-to-br from-teal-500 to-teal-600',
];

export const Avatar: React.FC<AvatarProps> = ({
  email,
  name,
  size = 'md',
  className,
}) => {
  // Obtenir la première lettre de l'email ou du nom
  const initial = (name || email).charAt(0).toUpperCase();
  
  // Sélectionner une couleur basée sur le code ASCII de la première lettre
  const colorIndex = initial.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div
      className={clsx(
        'relative rounded-full flex items-center justify-center font-bold text-white shadow-lg',
        bgColor,
        sizeClasses[size],
        className
      )}
    >
      {initial}
    </div>
  );
};
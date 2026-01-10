// src/lib/types.ts

export interface OnboardingSlide {
    id: number;
    title: string;
    description: string;
    image: string;
    backgroundColor: string;
  }
  
  export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    rating: number;
    popular?: boolean;
    favorite?: boolean;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    password: string;
  }
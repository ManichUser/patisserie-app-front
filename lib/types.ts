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


export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatar: string | null
  totalOrders: number
  totalSpent: number
  lastOrderDate: string | null
  createdAt: string
  loyaltyPoints: number
  segment: string
}

export interface Order {
  id: string
  orderNumber: string
  user: {
    id: string
    name: string
    phone: string
  }
  deliveryName: string
  deliveryPhone: string
  deliveryAddress: string
  deliveryCity: string
  deliveryDistrict: string
  status: string
  paymentStatus: string
  total: number
  subtotal: number
  deliveryFee: number
  items: {
    id: string
    productName: string
    quantity: number
    price: number
  }[]
  createdAt: string
  scheduledAt: string | null
}
export interface ProductCardProps {
  id: string
  name: string
  category: string
  price: number
  image: string
  rating: number
  popular?: boolean
  description?: string
  stock?: number
}
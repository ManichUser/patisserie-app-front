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

export interface StatCardProps {
  label: string;
  value: number;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

export interface SpecialOffer {
  id: string;
  title: string;
  description?: string;
  type: string;
  image?: string;
  badge?: string;
  discountType: string;
  discountValue: number;
  minPurchase?: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
  productIds: string[];
  categoryIds: string[];
}

export interface OfferCardProps {
  offer: SpecialOffer;
  onEdit: (offer: SpecialOffer) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
  onDuplicate?: (offer: SpecialOffer) => void;
}
export interface OfferFormData {
  title: string;
  description: string;
  type: string;
  badge: string;
  discountType: string;
  discountValue: string;
  minPurchase: string;
  maxDiscount: string;
  startDate: string;
  endDate: string;
  usageLimit: string;
  limitPerUser: string;
  isActive: boolean;
  productIds: string[];
  categoryIds: string[];
}

export interface OfferModalProps {
  isOpen: boolean;
  offer?: any;
  onClose: () => void;
  onSave: (data: OfferFormData) => Promise<void>;
}

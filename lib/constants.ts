// src/lib/constants.ts

import { OnboardingSlide } from './types';

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Découvrez nos délices',
    description: 'Une sélection de pâtisseries artisanales préparées avec amour et des ingrédients de qualité.',
    image: '/images/onboarding-1.png',
    backgroundColor: '#FFF5F5',
  },
  {
    id: 2,
    title: 'Commandez en ligne',
    description: 'Passez vos commandes facilement depuis chez vous et recevez vos pâtisseries fraîches.',
    image: '/images/onboarding-2.png',
    backgroundColor: '#F5FFF8',
  },
  {
    id: 3,
    title: 'Livraison rapide',
    description: 'Profitez d\'une livraison rapide et soignée directement à votre porte.',
    image: '/images/onboarding-3.png',
    backgroundColor: '#FEF9F5',
  },
];

export const APP_NAME = 'Force Des Saveurs';
export const APP_TAGLINE = 'L\'art de la pâtisserie à portée de main';

export const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: 'onboarding_completed',
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
};

export const ROUTES = {
  LAUNCH: '/',
  ONBOARDING: '/onboarding',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  HOME: '/home',
  FAVORITES: '/favorites',
  CART: '/cart',
  PROFILE: '/profile',
};
// Mock data - Pâtisserie Camerounaise 🇨🇲
export const products = [
  {
    id: '1',
    name: 'Gâteau au Chocolat Suprême',
    category: 'Gâteaux',
    price: 8500, // FCFA
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    rating: 4.9,
    popular: true,
    description: 'Notre best-seller! Moelleux comme du beurre de karité',
    stock: 12,
  },
  {
    id: '2',
    name: 'Cupcake Vanille "Doux Mariage"',
    category: 'Cupcakes',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&q=80',
    rating: 4.7,
    description: 'Parfait pour les cérémonies, doux comme le miel de Ngaoundéré',
    stock: 24,
  },
  {
    id: '3',
    name: 'Tarte aux Fruits Tropicaux',
    category: 'Tartes',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1519915212116-715fb0bc3734?w=800&q=80',
    rating: 4.8,
    popular: true,
    description: 'Mangue, ananas et passion - Les saveurs de chez nous!',
    stock: 8,
  },
  {
    id: '4',
    name: 'Macarons Assortis "Délice Royal"',
    category: 'Biscuits',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80',
    rating: 4.9,
    description: 'Boîte de 12 pièces - Fondants en bouche comme du beignet chaud',
    stock: 15,
  },
  {
    id: '5',
    name: 'Red Velvet "Cœur de Ndolè"',
    category: 'Gâteaux',
    price: 9500,
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80',
    rating: 4.8,
    popular: true,
    description: 'Rouge passion avec glaçage cream cheese - C\'est succulent oh!',
    stock: 6,
  },
  {
    id: '6',
    name: 'Croissant au Beurre "Matin Frais"',
    category: 'Viennoiseries',
    price: 800,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
    rating: 4.6,
    description: 'Croustillant dehors, moelleux dedans - Comme à la boulangerie française!',
    stock: 30,
  },
  {
    id: '7',
    name: 'Donut Chocolat "Mbongo Tchobi"',
    category: 'Beignets',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
    rating: 4.7,
    description: 'Garni de chocolat noir intense - Ça fond comme du piment doux',
    stock: 20,
  },
  {
    id: '8',
    name: 'Cheesecake Passion "Saveur Tropicale"',
    category: 'Gâteaux',
    price: 7000,
    image: 'https://images.unsplash.com/photo-1533134242782-0b5e6a1e5fb2?w=800&q=80',
    rating: 4.9,
    popular: true,
    description: 'Au fruit de la passion de Foumban - C\'est trop bon!',
    stock: 10,
  },
  {
    id: '9',
    name: 'Brownies "Pétrole Noir"',
    category: 'Biscuits',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80',
    rating: 4.8,
    description: 'Ultra fondant au chocolat - Dense comme le mont Cameroun!',
    stock: 18,
  },
  {
    id: '10',
    name: 'Tiramisu "Café de Mfoundi"',
    category: 'Desserts',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
    rating: 4.7,
    description: 'Au café arabica de l\'Ouest - Ça réveille comme un bon matin!',
    stock: 12,
  },
  {
    id: '11',
    name: 'Éclair au Chocolat "Longue Route"',
    category: 'Viennoiseries',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80',
    rating: 4.6,
    description: 'Pâte à choux croustillante, crème onctueuse - Trop doux!',
    stock: 16,
  },
  {
    id: '12',
    name: 'Mille-feuille "Palais Royal"',
    category: 'Tartes',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80',
    rating: 4.8,
    description: 'Feuilletage croustillant et crème pâtissière - Comme au palais!',
    stock: 9,
  },
  {
    id: '13',
    name: 'Pain au Chocolat "Petit Déj"',
    category: 'Viennoiseries',
    price: 900,
    image: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=800&q=80',
    rating: 4.5,
    description: 'Avec double barre de chocolat - Pour bien commencer la journée!',
    stock: 25,
  },
  {
    id: '14',
    name: 'Tarte Citron Meringuée "Soleil d\'Afrique"',
    category: 'Tartes',
    price: 5800,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    rating: 4.9,
    popular: true,
    description: 'Acidulée et sucrée - Rafraîchissant comme une brise à Kribi!',
    stock: 7,
  },
  {
    id: '15',
    name: 'Cookie Pépites Chocolat "Nkap"',
    category: 'Biscuits',
    price: 500,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80',
    rating: 4.6,
    description: 'Croquant et généreux en pépites - Comme les pièces de monnaie!',
    stock: 40,
  },
  {
    id: '16',
    name: 'Gâteau Forêt Noire "Nuit de Douala"',
    category: 'Gâteaux',
    price: 10500,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
    rating: 4.9,
    popular: true,
    description: 'Chocolat noir, cerises et chantilly - Élégant comme un costume de mariage!',
    stock: 5,
  },
  {
    id: '17',
    name: 'Chausson aux Pommes "Douceur Bamiléké"',
    category: 'Viennoiseries',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    rating: 4.7,
    description: 'Compote de pommes maison - Comme les confitures de grand-mère!',
    stock: 14,
  },
  {
    id: '18',
    name: 'Religieuse Café "Double Étage"',
    category: 'Desserts',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1587241321921-91a834d82ffc?w=800&q=80',
    rating: 4.8,
    description: 'Choux superposés au café - Haute comme les building de Bonapriso!',
    stock: 11,
  },
  {
    id: '19',
    name: 'Tarte Tatin "Caramel d\'Or"',
    category: 'Tartes',
    price: 6200,
    image: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&q=80',
    rating: 4.7,
    description: 'Pommes caramélisées - Doré comme l\'or du Lom et Djerem!',
    stock: 8,
  },
  {
    id: '20',
    name: 'Paris-Brest "Champion"',
    category: 'Desserts',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80',
    rating: 4.9,
    description: 'Crème pralinée aux noisettes - Fort comme les Lions Indomptables!',
    stock: 10,
  },
];

// Catégories
export const categories = [
  { id: '1', name: 'Tout', icon: '🍰', slug: 'all' },
  { id: '2', name: 'Gâteaux', icon: '🎂', slug: 'gateaux' },
  { id: '3', name: 'Cupcakes', icon: '🧁', slug: 'cupcakes' },
  { id: '4', name: 'Tartes', icon: '🥧', slug: 'tartes' },
  { id: '5', name: 'Viennoiseries', icon: '🥐', slug: 'viennoiseries' },
  { id: '6', name: 'Biscuits', icon: '🍪', slug: 'biscuits' },
  { id: '7', name: 'Beignets', icon: '🍩', slug: 'beignets' },
  { id: '8', name: 'Desserts', icon: '🍮', slug: 'desserts' },
];

// Fonction utilitaire pour formater les prix en FCFA
export const formatPrice = (price: number): string => {
  return `${price.toLocaleString('fr-FR')} FCFA`;
};

// Fonction pour filtrer par catégorie
export const filterByCategory = (category: string) => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

// Fonction pour obtenir les produits populaires
export const getPopularProducts = () => {
  return products.filter(product => product.popular);
};

// Fonction pour obtenir les produits en stock
export const getInStockProducts = () => {
  return products.filter(product => product.stock > 0);
};
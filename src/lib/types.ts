export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  sizes?: ProductSize[];
  isPromotion?: boolean;
  promotionDay?: string;
  isOutOfStock?: boolean;
  isNew?: boolean;
}

export interface ProductSize {
  size: string;
  price: number;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  additionals?: Additional[];
}

export interface Additional {
  id: string;
  name: string;
  price: number;
}

export interface StoreInfo {
  name: string;
  isOpen: boolean;
  address: string;
  phone: string;
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  paymentMethods: string[];
}

export type DaysOfWeek = "Segunda" | "Terça" | "Quarta" | "Quinta" | "Sexta" | "Sábado" | "Domingo";

export interface DailyPromotion {
  id: string;
  day: DaysOfWeek;
  name: string;
  description: string;
  originalPrice: number;
  price: number;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  inStock: boolean;
  featured?: boolean;
  size?: string;
  notes?: string[];
  rating?: number;
  reviews?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

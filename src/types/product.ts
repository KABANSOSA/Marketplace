export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  specifications: {
    [key: string]: string;
  };
} 
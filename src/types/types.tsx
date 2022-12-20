export interface IProduct {
  category?: {
    id: number;
    image: string;
    name: string;
  };
  description?: string;
  id: number;
  images: string[];
  price: number;
  title: string;
}

export interface IBook {
  id: number;
  title: string;
  description?: string;
  img?: string;
  price?: number;
}

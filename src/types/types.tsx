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

export interface IProductsResponse {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    description: string;
    publisher: string;
    pageCount: number;
    publishedDate: string;
    authors: string[];
    categories: string[];
    imageLinks: {
      thumbnail: string;
    };
  };
  saleInfo: {
    listPrice: {
      amount: number;
    };
    isEbook: boolean;
  };
  authors: string[];
  description: string;
}

export interface IBook {
  id: number;
  title: string;
  description?: string;
  img?: string;
  price?: number;
}

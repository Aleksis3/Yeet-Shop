import React, { useEffect, useState } from "react";
import { IProduct } from "../../types/types";
import ProductItem from "./Product/ProductItem";
import "./Products.scss";

interface Response {
  id: number;
  volumeInfo: {
    title: string;
    subtitle: string;
    imageLinks: {
      thumbnail: string;
    };
  };
  // industryIdentifers: {
  //   imageLinks: any[];
  // };
  saleInfo: {
    listPrice: {
      amount: number;
    };
  };
  authors: string[];
  description: string;
}

interface IProductsProps {
  category?: number;
}
function Products(props: IProductsProps) {
  const [products, setProducts] = useState<Response[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&filter=paid-ebooks&download=epub&maxResults=25&sort=newest`
      );
      const json = await data.json();
      setProducts(json.items);
    };
    fetchData();
  }, []);
  console.log(products);
  const productEls = products?.map((product) => {
    return (
      <ProductItem
        title={product.volumeInfo.title}
        key={product.id}
        id={product.id}
        price={product.saleInfo.listPrice.amount}
        img={`${product.volumeInfo.imageLinks.thumbnail}`}
      />
    );
  });

  return (
    <section className="products">
      <h2 className="products__heading">Newly added</h2>
      <div className="products__grid">{productEls}</div>
    </section>
  );
}

export default Products;

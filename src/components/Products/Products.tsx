import { useEffect, useState } from "react";
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
  category?: string;
  title: string;
}
function Products(props: IProductsProps) {
  const [products, setProducts] = useState<Response[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${
            props.category ? props.category : "fiction"
          }&filter=paid-ebooks&download=epub&langRestrict=en&maxResults=25&sort=newest`
        );
        if (!data.ok) {
          const e = await data.json();
          throw e;
        }
        const json = await data.json();
        setProducts(json.items);
      } catch (e) {
        console.log(e);
        console.error(e);
      }
    };
    fetchData();
  }, [props.category]);

  console.log(products);

  const productEls = products?.map((product) => {
    return (
      <ProductItem
        title={product.volumeInfo.title}
        key={product.id}
        id={product.id}
        price={product.saleInfo?.listPrice?.amount}
        img={`${product.volumeInfo.imageLinks.thumbnail}`}
      />
    );
  });

  return (
    <section className="products">
      <h2 className="products__heading">{props.title}</h2>
      <div className="products__grid">{productEls}</div>
    </section>
  );
}

export default Products;

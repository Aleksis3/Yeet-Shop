import { useEffect, useState } from "react";
import Pagination from "./Pagination";
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
  const [productsCount, setProductsCount] = useState(0);
  const [index, setIndex] = useState(0);

  // change API's call starting index in accordance to clicked
  // page button

  const handleChangeIndex = (num: number, operator: string) => {
    window.scrollTo(0, 0);
    if (operator === "+") {
      setIndex((prev) => prev + num);
    } else {
      setIndex((prev) => prev - num);
    }
  };

  // set current index to 0 after switching categories
  useEffect(() => {
    setIndex(0);
  }, [props.category]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${
            props.category ? props.category : "fiction"
          }&filter=paid-ebooks&download=epub&langRestrict=en&maxResults=25&sort=newest&startIndex=${index}`
        );
        if (!data.ok) {
          const e = await data.json();
          throw e;
        }
        const json = await data.json();
        setProducts(json.items);
        setProductsCount(json.totalItems);
      } catch (e) {
        console.log(e);
        console.error(e);
      }
    };
    fetchData();
  }, [props.category, index]);

  console.log(products);

  // map fetched results to single Product components

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
      <Pagination
        index={index}
        productsCount={productsCount}
        handleChangeIndex={handleChangeIndex}
      />
    </section>
  );
}

export default Products;

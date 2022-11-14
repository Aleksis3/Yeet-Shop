import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../../types/types";
import "./Product.scss";

interface Response {
  id: number;
  volumeInfo: {
    title: string;
    subtitle: string;
    description: string;
    imageLinks: {
      thumbnail: string;
    };
  };
  // industryIdentifers: {
  //   imageLinks: any[];
  // };
  saleInfo?: {
    listPrice: {
      amount: number;
    };
  };
  authors: string[];
}
function Product() {
  let { id } = useParams();
  const [product, setProduct] = useState<Response>();
  console.log(product);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );
      const json = await data.json();
      setProduct(json);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div className="product">
      <div className="product__left">
        <img
          className="product__img"
          src={`${product?.volumeInfo.imageLinks.thumbnail}`}
          alt=""
        />

        {/* <p>{product?.category?.name}</p> */}
      </div>
      <div className="product__right">
        <p className="product__title">{product?.volumeInfo.title}</p>
        <p>{product?.volumeInfo.description}</p>
      </div>
      <div className="product__reviews">
        <p>Want to share own thoughts about the book?</p>
        <button>Leave a rating!</button>
      </div>
    </div>
  );
}

export default Product;

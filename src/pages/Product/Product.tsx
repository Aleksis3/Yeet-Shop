import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addWithThunk } from "../../redux/cartSlice";
import { useAppDispatch } from "../../redux/hooks";
// import { IProduct } from "../../types/types";
import "./Product.scss";
import Reviews from "./Reviews/Reviews";

interface Response {
  id: number;
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
  };
}

function Product() {
  let { id } = useParams();
  const [product, setProduct] = useState<Response>();
  const dispatch = useAppDispatch();
  const handleAdd = () =>
    dispatch(
      addWithThunk({
        id,
        title: product?.volumeInfo.title,
        price: product?.saleInfo.listPrice.amount,
        img: product?.volumeInfo.imageLinks.thumbnail,
      })
    );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        if (!data.ok) {
          const e = await data.json();
          throw e;
        }
        const json = await data.json();
        setProduct(json);
      } catch (e: any) {
        alert(e.error.message);
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  let categories = product?.volumeInfo.categories
    .splice(0, 3)
    .map((category) => (
      <p>
        {category},<br />
      </p>
    ));

  return (
    <>
      <div className="product">
        <div className="product__img-container">
          <img
            className="product__img"
            src={`${product?.volumeInfo.imageLinks.thumbnail}`}
            alt="Book's cover"
          />
        </div>
        <div className="product__details">
          <div className="product__identifiers">
            <p className="product__title">{product?.volumeInfo.title},</p>
            <p className="product__author">
              {product?.volumeInfo?.authors
                ?.splice(0, 3)
                .join(", ")
                .toString() || "Author Unknown"}
            </p>
          </div>
          <p>Publisher: {product?.volumeInfo.publisher}</p>
          <p>Year: {product?.volumeInfo.publishedDate}</p>
          <p className="product__categories-header">Categories: </p>
          {categories}
          <div className="product__buy-container">
            <p>
              Price: <b>{product?.saleInfo.listPrice.amount} PLN</b>
            </p>
            <button className="product__buy-btn" onClick={handleAdd}>
              Add to cart
            </button>
          </div>
        </div>
        {product && (
          <div className="product__desc-container">
            <h2 className="product__desc-header">Description:</h2>
            <div
              className="product__desc"
              dangerouslySetInnerHTML={{
                __html: product.volumeInfo.description,
              }}
            />
          </div>
        )}
      </div>
      <Reviews bookId={id as string} />
    </>
  );
}

export default Product;

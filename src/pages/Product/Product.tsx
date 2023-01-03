import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { selectUserId } from "../../redux/authSlice";
import { addWithThunk } from "../../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IProductsResponse } from "../../types/types";
import "./Product.scss";
import Reviews from "./Reviews/Reviews";

function Product() {
  let { id } = useParams();
  const [product, setProduct] = useState<IProductsResponse>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserId);
  const handleAdd = () => {
    if (user) {
      dispatch(
        addWithThunk({
          id,
          title: product?.volumeInfo.title,
          price: product?.saleInfo.listPrice.amount,
          img: product?.volumeInfo.imageLinks.thumbnail,
        })
      );
    } else {
      alert("You must be logged in!");
    }
  };

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
        console.log(json);
        setProduct(json);
      } catch (e) {
        let eMessage = "Failed to fetch data";
        if (e instanceof Error) {
          eMessage = e.message;
        }
        alert(eMessage);
      }
    };
    fetchData();
  }, [id]);

  const categories = product?.volumeInfo?.categories
    ? product?.volumeInfo?.categories.splice(0, 3).map((category, i) => (
        <p key={i}>
          {category},<br />
        </p>
      ))
    : "Unknown";

  const authors =
    product?.volumeInfo?.authors?.splice(0, 3).join(", ").toString() ||
    "Author Unknown";

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
            <p className="product__author">{authors}</p>
          </div>
          <p>Publisher: {product?.volumeInfo.publisher || "Unknown"}</p>
          <p>Year: {product?.volumeInfo.publishedDate || "Unknown"}</p>
          <p>Pages: {product?.volumeInfo.pageCount || "Unknown"}</p>
          <p className="product__categories-header">Categories: </p>
          {categories}
          <div className="product__buy-container">
            <p>
              Price: <b>{product?.saleInfo.listPrice.amount} PLN</b>
            </p>
            <Button className="product__buy-btn" onClick={handleAdd}>
              Add to cart
            </Button>
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
      <Reviews bookId={id!} />
    </>
  );
}

export default Product;

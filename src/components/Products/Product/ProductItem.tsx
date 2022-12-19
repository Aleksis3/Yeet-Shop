import "./ProductItem.scss";
import { Link } from "react-router-dom";
import { addToCart } from "../../../redux/cartSlice";
import { useAppDispatch } from "../../../redux/hooks";

export interface IProductItemProps {
  id: number;
  title: string;
  description?: string;
  img?: string;
  price?: number;
}

function ProductItem(props: IProductItemProps) {
  const dispatch = useAppDispatch();

  // const handleClick =
  // );

  function shortenTitle(title: string) {
    if (title.length > 25) {
      return title.substring(0, 28) + "...";
    }
    return title;
  }

  return (
    <article className="product-item">
      <Link to={`/product/${props.id}`}>
        <img className="product-item__img" src={props.img} alt="" />
        <p className="product-item__title">{shortenTitle(props.title)}</p>
        <p className="product-item__price">{props.price} PLN</p>
      </Link>
      <button
        onClick={() =>
          dispatch(
            addToCart({
              id: props.id,
              title: props.title,
              price: props.price,
              img: props.img,
            })
          )
        }
        className="product-item__button"
      >
        Add to basket 🛒
      </button>
    </article>
  );
}

export default ProductItem;

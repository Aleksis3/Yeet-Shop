import "./ProductItem.scss";
import { Link } from "react-router-dom";
export interface IProductItemProps {
  id: number;
  title: string;
  description?: string;
  img?: string;
  price?: number;
}

function ProductItem(props: IProductItemProps) {
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
      <button className="product-item__button">Add to basket 🛒</button>
    </article>
  );
}

export default ProductItem;

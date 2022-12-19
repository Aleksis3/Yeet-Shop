import { Link } from "react-router-dom";
import "./CartItem.scss";

export interface ICartItemProps {
  id: string;
  title: string;
  description?: string;
  img: string;
  price: number;
  quantity: number;
}

function CartItem(props: ICartItemProps) {
  return (
    <div className="cart-item" key={props.id}>
      <div className="cart-item__left">
        <img className="cart-item__img" src={props.img} alt="Book's cover" />
      </div>
      <div className="cart-item__right">
        <Link className="cart-item__title" to={`/product/${props.id}`}>
          {props.title}
        </Link>
        <div className="cart-item__pricing-details">
          <p>{props.price} PLN</p>
          <p>x {props.quantity}</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

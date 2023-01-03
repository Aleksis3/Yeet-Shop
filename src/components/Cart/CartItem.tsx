import { Link } from "react-router-dom";
import { addWithThunk, removeWithThunk } from "../../redux/cartSlice";
import { useAppDispatch } from "../../redux/hooks";
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
  const dispatch = useAppDispatch();

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
          <div className="cart-item__quantity number-input">
            <button
              onClick={() => dispatch(removeWithThunk(props.id))}
            ></button>
            <input
              className="quantity"
              min="0"
              name="quantity"
              value={props.quantity}
              type="number"
            ></input>
            <button
              className="plus"
              onClick={() => dispatch(addWithThunk({ ...props }))}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

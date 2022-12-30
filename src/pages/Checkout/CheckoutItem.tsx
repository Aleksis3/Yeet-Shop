import "./CheckoutItem.scss";

export interface ICartItemProps {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

function CheckoutItem(props: ICartItemProps) {
  const priceTotal = +(props.price * props.quantity).toFixed(2);

  return (
    <div className="checkout-item" key={props.id}>
      <p className="checkout-item__title">{props.title}</p>
      <div className="checkout-item__pricing">
        <p>
          {props.price} PLN x{props.quantity} =
          <span className="checkout-item__price"> {priceTotal} PLN</span>
        </p>
      </div>
    </div>
  );
}

export default CheckoutItem;

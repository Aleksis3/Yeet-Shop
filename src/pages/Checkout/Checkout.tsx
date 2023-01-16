import { selectCartItems, selectTotalPrice } from "../../redux/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import CheckoutItem from "./CheckoutItem";
import "./Checkout.scss";

import CheckoutForm from "./CheckoutForm";

function Checkout() {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const productEls = cartItems.map((item) => {
    return (
      <CheckoutItem
        id={item.id}
        title={item.title}
        price={item.price}
        quantity={item.quantity}
      />
    );
  });

  return (
    <div className="checkout">
      <h1 className="checkout__header">Checkout</h1>
      <div className="checkout__grid">
        <div className="checkout__left">
          <h2 className="checkout__subheader checkout__products-header">
            Your products:
          </h2>
          <div className="checkout__items">{productEls}</div>
          <h3 className="checkout__total">
            Total: <span>{totalPrice} PLN</span>
          </h3>
        </div>
        <div className="checkout__right">
          <h2 className="checkout__subheader">Shipping Details:</h2>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}

export default Checkout;

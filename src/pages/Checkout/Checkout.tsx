import { selectCartItems, selectTotalPrice } from "../../redux/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import CheckoutItem from "./CheckoutItem";
import "./Checkout.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";
import { selectUserId } from "../../redux/authSlice";

function Checkout() {
  const cartItems = useAppSelector(selectCartItems);
  const user = useAppSelector(selectUserId);
  const [shippingPrice, setShippingPrice] = useState(16);
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

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="checkout">
      <h1 className="checkout__header">Checkout</h1>
      <div className="checkout__flex">
        <div className="checkout__left">
          <h2 className="checkout__subheader checkout__products-header">
            Your products:
          </h2>
          <div className="checkout__items">{productEls}</div>
          <form className="checkout__delivery">
            <label htmlFor="shipping">Pick a delivery option:</label>
            <select
              name="shipping"
              id="shipping"
              onChange={(e) => setShippingPrice(+e.target.value)}
            >
              <option value={16}>DHL (16 PLN)</option>
              <option value={13}>DPD (13 PLN)</option>
            </select>
          </form>
          <h3 className="checkout__total">
            Total: <span>{totalPrice + shippingPrice} PLN</span>
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

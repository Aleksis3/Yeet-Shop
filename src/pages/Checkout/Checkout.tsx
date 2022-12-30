import Cart from "../../components/Cart/Cart";
import {
  cleanCart,
  selectCartItems,
  selectTotalPrice,
} from "../../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CheckoutItem from "./CheckoutItem";
import "./Checkout.scss";
import { Link } from "react-router-dom";

function Checkout() {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const dispatch = useAppDispatch();

  const a = () => {
    dispatch(cleanCart());
  };

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
          <form action="" className="checkout__form">
            <div className="checkout__input-wrapper">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" />
            </div>
            <div className="checkout__input-wrapper">
              <label htmlFor="surname">Surname:</label>
              <input type="text" id="surname" />
            </div>
            <div className="checkout__input-wrapper">
              <label htmlFor="address-1">Address Line 1:</label>
              <input type="text" id="address-1" />
            </div>
            <div className="checkout__input-wrapper">
              <label htmlFor="address-2">Address Line 2:</label>
              <input type="text" id="address-2" />
            </div>
            <div className="checkout__input-wrapper">
              <label htmlFor="city">City:</label>
              <input type="text" id="city" />
            </div>
            <div className="checkout__input-wrapper">
              <label htmlFor="province">Province:</label>
              <input type="text" id="province" />
            </div>
            <div className="checkout__input-wrapper">
              <label htmlFor="postal">Postal Code:</label>
              <input type="number" id="postal" />
            </div>
            <Link to="/" onClick={a} className="checkout__form-button">
              Proceed To Payment
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

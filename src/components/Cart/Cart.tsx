import "./Cart.scss";
import CartItem from "./CartItem";
import { selectCartItems, selectTotalPrice } from "../../redux/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

function Cart() {
  const books = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const cartItems = books.map((book) => (
    <CartItem
      id={book.id}
      title={book.title}
      price={book.price}
      quantity={book.quantity}
      img={book.img}
    />
  ));

  return (
    <div className="cart">
      <div className="cart__cart-items">{cartItems}</div>
      {books.length ? (
        <div className="cart__summary">
          <p>
            Total: <span className="cart__price-total">{totalPrice} PLN</span>
          </p>
          <Link to="/checkout">
            <Button className="cart__btn">To Checkout</Button>
          </Link>
        </div>
      ) : (
        <p className="cart__summary">Your cart is currently empty!</p>
      )}
    </div>
  );
}

export default Cart;

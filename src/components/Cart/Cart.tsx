import "./Cart.scss";
import CartItem from "./CartItem";
import { selectCartItems } from "../../redux/cartSlice";
import { useAppSelector } from "../../redux/hooks";
function Cart() {
  const books = useAppSelector(selectCartItems);
  console.log(books);
  const cartItems = books.map((book) => (
    <CartItem id={book.id} title={book.title} price={book.price} />
  ));
  return <div className="cart">{cartItems}</div>;
}

export default Cart;

import "./Cart.scss";
import CartItem from "./CartItem";
import { selectCartItems } from "../../redux/cartSlice";
import { useAppSelector } from "../../redux/hooks";
function Cart() {
  const books = useAppSelector(selectCartItems);
  console.log(books);
  return (
    <div className="cart">
      <CartItem />
    </div>
  );
}

export default Cart;

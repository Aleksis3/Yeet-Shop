import "./Cart.scss";
import CartItem from "./CartItem";
import React, { useRef, useLayoutEffect, useState } from "react";
import { selectCartItems, selectTotalPrice } from "../../redux/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import { Link, useLocation } from "react-router-dom";
interface ICartProps {
  closeModal?: () => void;
}
function Cart(props: ICartProps) {
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
      <div className="cart__summary">
        <p>
          Total: <span className="cart__price-total">{totalPrice} PLN</span>
        </p>
        <Link to="/checkout">
          <button className="cart__btn">To Checkout</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;

import React, { useContext, useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import { logout, selectUser } from "../../redux/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectCartItems } from "../../redux/cartSlice";
import Modal from "../Modal/Modal";
import Cart from "../Cart/Cart";

function Header() {
  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const cartItems = useAppSelector(selectCartItems);
  console.log(cartItems);

  const closeSignUp = () => "d";

  const openModal = (feature: string) => {
    setModalContent(feature);
    setShowModal(true);
  };

  return (
    <header className="header">
      <Link className="header__logo" to="/">
        <p>YeetShop</p>
      </Link>
      <button className="header__favs">Favourites ✰</button>
      <button onClick={() => openModal("cart")}>Cart {cartItems.length}</button>
      {showModal && modalContent === "cart" && (
        <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
          <Cart />
        </Modal>
      )}
      {!user ? (
        <button className="header__login" onClick={(e) => "apy"}>
          Log In
        </button>
      ) : (
        <button onClick={() => dispatch(logout())}>Log out</button>
      )}

      <button onClick={(e) => openModal("signup")} className="header__register">
        Register
      </button>
      {showModal && modalContent === "signup" && (
        <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
          <SignUp handleClose={() => setShowModal(false)} />
        </Modal>
      )}
    </header>
  );
}

export default Header;

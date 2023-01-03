import { useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import SignUp from "../Auth/SignUp";
import { logout, selectUserId } from "../../redux/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectCartItems, selectItemsCount } from "../../redux/cartSlice";
import Modal from "../Modal/Modal";
import Cart from "../Cart/Cart";
import LogIn from "../Auth/LogIn";
import Button from "../Button/Button";

function Header() {
  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const user = useAppSelector(selectUserId);
  const cartItemsCount = useAppSelector(selectItemsCount);
  const dispatch = useAppDispatch();

  // opens the modal containing component specified
  // as an argument
  const openModal = (feature: string) => {
    setModalContent(feature);
    setShowModal(true);
  };

  return (
    <header className="header">
      <Link className="header__logo" to="/">
        <p>YeetShop</p>
      </Link>
      {user && (
        <Button onClick={() => openModal("cart")}>Cart {cartItemsCount}</Button>
      )}
      {showModal && modalContent === "cart" && (
        <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
          <Cart closeModal={() => setShowModal(false)} />
        </Modal>
      )}

      {!user ? (
        <Button onClick={() => openModal("login")}>Log In</Button>
      ) : (
        <Button className="header__btn" onClick={() => dispatch(logout())}>
          Log out
        </Button>
      )}
      {showModal && modalContent === "login" && (
        <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
          <LogIn handleClose={() => setShowModal(false)} />
        </Modal>
      )}
      {!user && (
        <Button className="header__btn" onClick={() => openModal("signup")}>
          Register
        </Button>
      )}
      {showModal && modalContent === "signup" && (
        <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
          <SignUp handleClose={() => setShowModal(false)} />
        </Modal>
      )}
    </header>
  );
}

export default Header;

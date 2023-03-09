import { useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import SignUp from "../Auth/SignUp";
import { logout, selectUserId } from "../../redux/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectItemsCount } from "../../redux/cartSlice";
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

  const buttons = user ? (
    <div className="header__btns">
      <Button onClick={() => openModal("cart")}>Cart ({cartItemsCount})</Button>
      <Button className="header__btn" onClick={() => dispatch(logout())}>
        Log out
      </Button>
    </div>
  ) : (
    <div className="header__btns">
      <Button className="header__btn" onClick={() => openModal("signup")}>
        Register
      </Button>
      <Button onClick={() => openModal("login")}>Log In</Button>
    </div>
  );

  return (
    <header className="header">
      <Link className="header__logo" to="/">
        <p>YeetShop</p>
      </Link>
      {buttons}
      {showModal && modalContent === "cart" && (
        <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
          <Cart />
        </Modal>
      )}
      {showModal && modalContent === "login" && (
        <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
          <LogIn handleClose={() => setShowModal(false)} />
        </Modal>
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

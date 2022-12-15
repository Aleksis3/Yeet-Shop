import React, { useContext, useState } from "react";
import "./Header.scss";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import { logout } from "../../redux/auth";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

function Header() {
  const [isLoginOpen, setIsLogInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  console.log(user);

  const closeSignUp = () => setIsSignUpOpen(false);

  // const user = useContext(AuthContext);

  return (
    <header className="header">
      <Link className="header__logo" to="/">
        <p>YeetShop</p>
      </Link>
      <button className="header__favs">Favourites ✰</button>
      {!user.length ? (
        <button className="header__login" onClick={(e) => setIsLogInOpen(true)}>
          Log In
        </button>
      ) : (
        <button onClick={() => dispatch(logout())}>Log out</button>
      )}

      <button
        onClick={(e) => setIsSignUpOpen(true)}
        className="header__register"
      >
        Register
      </button>
      {isSignUpOpen && <SignUp handleClose={closeSignUp} />}
    </header>
  );
}

export default Header;

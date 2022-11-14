import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="header">
      <Link className="header__logo" to="/">
        <p>YeetShop</p>
      </Link>
      <button className="header__favs">Favourites ✰</button>
      <button className="header__login">Log in</button>
      <button className="header__register">Register</button>
    </header>
  );
}

export default Header;

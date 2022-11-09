import React from "react";
import "./Header.scss";
function Header() {
  return (
    <header className="header">
      <p className="header__logo">YeetShop</p>
      <button className="header__favs">Favourites ✰</button>
      <button className="header__login">Log in</button>
      <button className="header__register">Register</button>
    </header>
  );
}

export default Header;

import "./Navbar.scss";
function Navbar() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">Clothes</li>
        <li className="nav__item">Electronics</li>
        <li className="nav__item">Furniture</li>
        <li className="nav__item">Shoes</li>
        <li className="nav__item">Flowers</li>
        <li className="nav__item">Others</li>
      </ul>
    </nav>
  );
}

export default Navbar;

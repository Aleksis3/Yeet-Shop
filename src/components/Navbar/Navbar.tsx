import "./Navbar.scss";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link to="/category/crime">Crime</Link>
        </li>
        <li className="nav__item">
          <Link to="/category/history">History</Link>
        </li>
        <li className="nav__item">
          <Link to="/category/nonfiction">Non-fiction</Link>
        </li>
        <li className="nav__item">
          <Link to="/category/philosophy">Philosophy</Link>
        </li>
        <li className="nav__item">
          <Link to="/category/arts">Arts</Link>
        </li>
        <li className="nav__item">
          <Link to="/category/design">Design</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

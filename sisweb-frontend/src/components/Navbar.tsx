import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import './NavBar.css'

const Navbar = () => {
  return (
    <nav className="navbar-container level">
      <div className="level-left">
        <div className="level-item">
          <div className="subtitle is-5">
            <strong className="logo">CORAZÓN CONTENTO</strong>
          </div>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <Link className="link dashboard" to="/dashboard"> Dashboard </Link>
        </div>
        <div className="level-item">
          <Link className="link" to="/products">Productos</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

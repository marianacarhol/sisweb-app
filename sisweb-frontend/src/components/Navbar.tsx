import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="level">
      <div className="level-left">
        <div className="level-item">
          <FontAwesomeIcon icon={faHome} className="fas fa-lg mr-3" />
          <div className="subtitle is-5">
            <strong>Corazón Contento</strong>
          </div>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <Link to="/dashboard"> Dashboard </Link>
        </div>
        <div className="level-item">
          <Link to="/products">Productos</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

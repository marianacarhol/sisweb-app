import { Outlet } from "react-router";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ProductPage from "./pages/ProductPage";

interface Props {}

const App = (props: Props) => {
return (
<>
  <nav className="level">
    <div className="level-left">
      <div className="level-item">
        <FontAwesomeIcon icon={faHome} className="fas fa-lg mr-3"/>
        <p className="subtitle is-5">
          <strong>Corazón Contento</strong>
        </p>
      </div>
    </div>  

    <div className="level-right">
      <p className="level-item">
        <Link to="/">
          <a>Inicio</a>
        </Link>
      </p>
      <p className="level-item">
        <Link to="/products">
          <a>Productos</a>
        </Link>
      </p>
      {/* <p className="level-item">
        <a>Orders</a>
      </p>
      <p className="level-item">
        <a>Providers</a>
      </p> */}
    </div>

    <div className="level-right">
      <p className="level-item">
      <button type="button" className="button is-link is-outlined">Cerrar sesión</button>
      </p>
    </div>
  </nav>
  <ProductPage />
  <Outlet />
</>
);
};

export default App;
import { Link } from "react-router-dom";

interface FilterBarProps {
  selectedType: string;
  setSelectedType: (value: string) => void;
  handleFilter: () => void;
}

const FilterBar = ({ selectedType, setSelectedType, handleFilter }: FilterBarProps) => (
  <div className="panel-block">
    <div className="field is-grouped">
      <div className="field">
        <label className="label">Nombre</label>
        <div className="control">
          <input className="input" type="text" placeholder="Text input" />
        </div>
      </div>

      <div className="field">
        <label className="label">Tipo</label>
        <div className="control">
          <div className="select">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field is-align-content-flex-end mb-3">
        <div className="control">
          <button className="button is-link is-outlined" onClick={handleFilter}>
            Filtrar
          </button>
        </div>
      </div>

      <div className="field is-align-content-flex-end mb-3">
        <div className="control">
          <Link to="/addProduct">
            <button className="button is-link">Añadir</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default FilterBar;
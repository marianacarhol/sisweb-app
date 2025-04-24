import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Product } from "my-types";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: number) => void;
}

const ProductTable = ({ products, onDelete }: ProductTableProps) => (
  <div className="panel-block">
    <table className="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Tipo de producto</th>
          <th>Fecha de actualización</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <th>{product.id}</th>
            <td>
              <a className="button is-ghost p-0">{product.nombre}</a>
            </td>
            <td>{product.cantidad}</td>
            <td>{product.productTypeId}</td>
            <td>
              {new Date(product.updatedAt).toLocaleString("es-MX", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </td>
            <td>
              <button type="button" onClick={() => onDelete(product.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductTable;

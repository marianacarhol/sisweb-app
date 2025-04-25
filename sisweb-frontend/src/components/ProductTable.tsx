import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Product } from "my-types";
import { Donation } from "my-types";
import { Link } from "react-router-dom";

interface ProductTableProps {
  donations: Donation[]
  products: Product[];
  onDelete: (id: number) => void;
}

const ProductTable = ({ products, donations, onDelete }: ProductTableProps) => (
  <div className="panel-block">
    <table className="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Tipo de producto</th>
          <th>ID de Donador</th>
          <th>Fecha de actualización</th>
          <th>Eliminar</th>
          <th>Modificar</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          // Find donation linked to the current product
          const relatedDonation = donations.find((donation) => donation.productId === product.id);

          return (
            <tr key={product.id}>
              <th>{product.id}</th>
              <td>
                <a className="button is-ghost p-0">{product.nombre}</a>
              </td>
              <td>{product.cantidad}</td>
              <td>{product.productTypeId}</td>
              <td>{relatedDonation ? relatedDonation.personId : "-"}</td>
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
              <td className="has-text-centered">
                <button
                  type="button"
                  onClick={() => onDelete(product.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
              <td className="has-text-centered">
                <Link to={`/modifyproduct/${product.id}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);


export default ProductTable;


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
//import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Product } from "my-types";
import React, {useState, useEffect, PureComponent} from 'react';
import { getAllProducts, deleteProduct } from "../api/ProductAPI";
import Example from "../components/SimpleBarChart.tsx";

interface Props{}

const ProductPage = (_props: Props) => {
  // COMPONENT STATE
  const [products, setProducts]= useState<Product[]>([]);
  
  // COMPONENT EVENTS
  useEffect(()=>{
  getAllProducts().then((data:any) => setProducts(data));
  }, []);

  const handleDelete = async (id: number) => {
    console.log("Intentando eliminar producto con ID:", id);
    const confirmado = confirm("¿Estás segura de eliminar este producto?");
    if (!confirmado) return;
  
    await deleteProduct(id);
    const productos = await getAllProducts();
    if (productos) setProducts(productos); // Si la respuesta no es undefined, actualiza el estado con la lista nueva
  };
  
  return (
    <>
      <nav className="panel">
        <p className="panel-heading">Productos</p>

        <div className="panel-block">
          <h2>Filtro</h2>
        </div>

        <div className="panel-block ">
          <div className="field is-grouped">
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Text input"
                />
              </div>
            </div>

            {/* <div className="field">
              <label className="label">Descripcion</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Text input"
                />
              </div>
            </div> */}

            <div className="field">
              <label className="label">Tipo</label>
              <p className="control">
                <div className="select">
                  <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
              </p>
            </div>

            <div className="field is-align-content-flex-end mb-3">
              <p className="control">
                <button className="button is-link is-outlined">
                  Filtrar
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <h2>Resultados</h2>
        </div>

        <div className="panel-block">
          <table className="table is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Tipo de producto</th>
                <th>Fecha de actualización</th>
                {/* <th>
                  <abbr title="Discount Percentage">Disc.%</abbr>
                </th>
                <th>Rating</th>
                <th>Stock</th>
                <th>Modify</th> */}
                <th>Eliminar</th>
              </tr>
            </thead>
            {/* <tfoot>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Tipo de producto</th>
                <th>Fecha de actualizacion</th>
              </tr>
            </tfoot> */}
            <tbody>
              {products.map((product) => {
              return (
                <tr key={product.id}>
                <th>{product.id}</th>
                <td>
                <a className="button is-ghost p-0">{product.nombre}</a>
                </td>
                <td>{product.cantidad}</td>
                <td>{product.productTypeId}</td>
                <td>{product.updatedAt.toLocaleString()}</td>
                {/* <td>{product.discountPercentage}</td>
                <td>{product.rating}</td>
                <td>{product.stock}</td> */}
                {/* <td>
                <button
                type="button"
                onClick={() => handleDelete(product.id)}>Eliminar
                </button>
                </td> */}
                <td>
                <button
                type="button"
                onClick={() => handleDelete(product.id)}
                >
                <FontAwesomeIcon icon={faTrash} />
                </button>
                </td>
                </tr>
              );
              })}
              </tbody>
          </table>
        </div>
      </nav>
      <div className="pt-6">
        <Example data={products} />
      </div>
    </>
  );
}

    
export default ProductPage;
    

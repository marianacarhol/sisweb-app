import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateProduct, getProductById } from "../api/ProductAPI";

const ModifyPage = () => {
  const { id } = useParams();
  const numericId = Number(id);

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState<string>("");
  const [productTypeId, setTipoProducto] = useState<string>("");

  useEffect(() => {
    if (!numericId) return;

    getProductById(numericId).then((product) => {
      if (product) {
        setNombre(product.nombre);
        setCantidad(product.cantidad.toString());
        setTipoProducto(product.productTypeId.toString());
      } else {
        alert("Producto no encontrado.");
      }
    });
  }, [numericId]);

  const handleModify = () => {
    if (!numericId) return alert("ID inválido");

    if (confirm("¿Modificar producto?")) {
      updateProduct(
        numericId,
        nombre || undefined,
        cantidad !== "" ? Number(cantidad) : undefined,
        productTypeId !== "" ? Number(productTypeId) : undefined
      );
    }
  };

  return (
    <nav className="panel">
      <div className="panel-heading">Modificar Producto</div>
      <div className="panel-block">
        <div className="field is-group">

          <div className="field">
            <div>ID del producto:</div>
            <input className="input" type="number" value={numericId} readOnly />
          </div>

          <div className="field">
            <div>Nombre:</div>
            <input
              className="input"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="field">
            <div>Cantidad:</div>
            <input
              className="input"
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>

          <div className="field">
            <div>Tipo de Producto:</div>
            <input
              className="input"
              type="number"
              value={productTypeId}
              onChange={(e) => setTipoProducto(e.target.value)}
            />
          </div>

          <div>
            <button className="button mt-5" onClick={handleModify}>
              Modify
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default ModifyPage;

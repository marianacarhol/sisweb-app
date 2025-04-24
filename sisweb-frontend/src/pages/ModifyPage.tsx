import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateProduct, getProductById } from "../api/ProductAPI";
import "./ModifyPage.css"; // <-- Asegúrate de importar el CSS

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
    <div className="container mt-5" style={{ fontFamily: "'Lusitana', serif" }}>
      <div className="row">
        <main className="col-10 offset-1">
          <h1 className="modify-title">EDITAR PRODUCTO</h1>
          <hr />

          <form className="mb-5">
            <div className="mb-4">
              <label className="modify-label">ID</label>
              <input
                type="text"
                className="form-control modify-input"
                value={numericId}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="modify-label">Nombre</label>
              <input
                type="text"
                className="form-control modify-input"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="modify-label">Cantidad</label>
              <input
                type="number"
                className="form-control modify-input"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="modify-label">Tipo de producto</label>
              <input
                type="number"
                className="form-control modify-input"
                value={productTypeId}
                onChange={(e) => setTipoProducto(e.target.value)}
              />
            </div>

            <hr />

            <div className="d-flex justify-content-end">
              <button
                type="button"
                onClick={handleModify}
                className="modify-button"
              >
                Confirmar
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ModifyPage;

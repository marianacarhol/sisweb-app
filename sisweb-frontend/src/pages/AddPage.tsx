import { useState } from "react";
import { addProduct, deleteProduct } from "../api/ProductAPI";
import { addDonation } from "../api/DonationAPI";
import { useNavigate } from "react-router-dom";
import './AddPage.css'

interface Props {}

const AddPage = (_props: Props) => {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState<number>(0);
    const [productTypeId, setTipoProducto] = useState<number>(0);
    const [personId, setTipoPersona] = useState<number>(0);
    const navigate = useNavigate();

    return (
        <div className="container mt-5" style={{ fontFamily: "'Lusitana', serif" }}>
            <div className="row">
                <main className="col-md-8 offset-md-2">
                    <h1 className="add-title text-center">AGREGAR PRODUCTO</h1>
                    <hr />

                    <form className="mb-5">
                        <div className="mb-4">
                            <label className="add-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control add-input"
                                placeholder="Nombre del producto"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="add-label">Cantidad</label>
                            <input
                                type="number"
                                className="form-control add-input"
                                placeholder="Cantidad"
                                value={cantidad}
                                onChange={(e) => setCantidad(Number(e.target.value))}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="add-label">Tipo de Producto</label>
                            <input
                                type="number"
                                className="form-control add-input"
                                placeholder="Tipo de Producto"
                                value={productTypeId}
                                onChange={(e) => setTipoProducto(Number(e.target.value))}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="add-label">ID de Donador</label>
                            <input
                                type="number"
                                className="form-control add-input"
                                placeholder="ID de Donador"
                                value={personId}
                                onChange={(e) => setTipoPersona(Number(e.target.value))}
                            />
                        </div>

                        <hr />

                        <div className="d-flex justify-content-end">
                            <button
                                type="button"
                                onClick={async () => {
                                    console.log("Attempting to add:", {
                                        nombre,
                                        cantidad,
                                        productTypeId,
                                        personId,
                                    });

                                    if (confirm("¿Agregar producto?")) {
                                        let productId: number | undefined;

                                        try {
                                            productId = await addProduct(nombre, cantidad, productTypeId);
                                            console.log("Product ID:", productId);

                                            if (!productId) {
                                                alert("Creación de producto fallida. ID indefinido.");
                                                return;
                                            }

                                            if (personId === null || personId === undefined || personId === 0) {
                                                alert("Producto creado exitosamente sin donación.");
                                                navigate("/products");
                                                return;
                                            }

                                            if (personId < 0) {
                                                alert("ID de donador inválido. Creación de producto cancelada.");
                                                await deleteProduct(productId);
                                                return;
                                            }

                                            await addDonation(personId, productId, cantidad);
                                            navigate("/products");
                                            alert("Producto y donación creados exitosamente.");
                                        } catch (error: any) {
                                            if (productId) {
                                                try {
                                                    await deleteProduct(productId);
                                                    console.warn("Producto eliminado debido a un error en la donación.");
                                                } catch (deleteError) {
                                                    console.error("Falló la limpieza del producto:", deleteError);
                                                }
                                            }

                                            if (error.response?.status === 500) {
                                                alert("ID de donador no encontrado en la base de datos. Creación cancelada.");
                                            } else {
                                                alert("Ocurrió un error inesperado. Por favor, inténtalo nuevamente.");
                                            }

                                            console.error("Detalles del error:", error);
                                        }
                                    }
                                }}
                                className="btn btn-primary add-button"
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

export default AddPage;

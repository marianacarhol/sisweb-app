import { useState } from "react";
import { addProduct } from "../api/ProductAPI";

interface Props {}

const AddPage = (_props: Props) => {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState<number>(0);
    const [productTypeId, setTipoProducto] = useState<number>(0);

return(
    <>
    <nav className="panel">
    <div className="panel-heading"> Create Product </div>
    <div className="panel-block">
        <div className="field is-group">
            <div className="field is-align-content-flex-end">
                <div>Nombre: </div>
                <input className="input" type="text" placeholder="Text input" onChange={(e) => setNombre(e.target.value)} />
            </div>

            <div>
                <div>Cantidad: </div>
                <input className="input" type="number" placeholder="Text input" onChange={(e) => setCantidad(Number(e.target.value))}/>
            </div>    
            
            <div>
                <div>Tipo de Producto: </div>
                <input className="input" type="number" placeholder="Text input" onChange={(e) => setTipoProducto(Number(e.target.value))}/>
            </div>

            <div>
                <button className="button mt-5" onClick={() => {
                    {
                        console.log("Attempting to add:", { nombre, cantidad, productTypeId });

                        if (confirm('Add product?')) {
                            addProduct(nombre, cantidad, productTypeId);
                        }
                    }}}>
                    Add
                </button>
            </div>

        </div>
    </div>
    </nav>
    
    </>
)

};

export default AddPage
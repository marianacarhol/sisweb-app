import { useState } from "react";
import { addProduct, deleteProduct } from "../api/ProductAPI";
import { addDonation } from "../api/DonationAPI";

interface Props {}

const AddPage = (_props: Props) => {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState<number>(0);
    const [productTypeId, setTipoProducto] = useState<number>(0);
    const [personId, setTipoPersona] = useState<number>(0);

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
                <div>Id de Donador: </div>
                <input className="input" type="number" placeholder="Text input" onChange={(e) => setTipoPersona(Number(e.target.value))}/>
            </div>

            <div>
            <button
    className="button mt-5"
    onClick={async () => {
        console.log("Attempting to add:", { nombre, cantidad, productTypeId, personId });

        if (confirm('Add product?')) {
            let productId: number | undefined;

            try {
                // Create the product and get its ID
                productId = await addProduct(nombre, cantidad, productTypeId);
                console.log("Product ID:", productId);

                // Ensure the productId is valid before continuing
                if (!productId) {
                    alert("Product creation failed. ID is undefined. Aborting.");
                    return; // Exit the function entirely
                }

                // Handle empty `personId` (0, null, or undefined)
                if (personId === null || personId === undefined || personId === 0) {
                    alert("Product created successfully without a donation.");
                    return; // Exit without creating a donation
                }

                // Handle truly invalid `personId` (negative numbers)
                if (personId < 0) {
                    alert("Invalid person ID. Product creation aborted.");
                    await deleteProduct(productId); // Clean up the created product
                    return; // Exit the function
                }

                // Proceed to create the donation only if `personId` is valid
                await addDonation(personId, productId, cantidad);
                alert("Product and donation created successfully!");
            } catch (error: any) {
                // Clean up orphaned product if donation creation fails
                if (productId) {
                    try {
                        await deleteProduct(productId);
                        console.warn("Product deleted due to a failed donation.");
                    } catch (deleteError) {
                        console.error("Failed to delete orphaned product:", deleteError);
                    }
                }

                // Handle specific errors like "personId not found"
                if (error.response?.status === 500) {
                    alert("Person ID not found in the database. Product creation aborted.");
                } else {
                    alert("An unexpected error occurred. Please try again.");
                }

                console.error("Error details:", error);
            }
        }
    }}
>
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
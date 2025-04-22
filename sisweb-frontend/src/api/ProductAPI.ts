import api from ".";
import { Product } from "my-types";

//ADD A PRODUCT
export const addProduct = async (nombre:string, cantidad:number, productTypeId: number) => {
    try {
        const res = await api.post(`/product/`, { nombre, cantidad, productTypeId }, {
        
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log("Product created successfully:", res.data)
    }
    catch (err) {
        console.log(err);
    }
}

//GET ALL PRODUCTS
export const getAllProducts = async () => {
try {
const res = await api.get('/product');
console.log(res.data); //-> for connection testing purpose
const products: Product[] = await res.data.payload;
return products;
} catch (err) {
console.log(err);
}
};

//DELETE A PRODUCT
export const deleteProduct = async (id: number) => {
try {
const res = await api.delete(`/product/${id}`);
console.log(res.data); //-> for connection testing purpose
return res.data;
} catch (err) {
console.log(err);
}
};
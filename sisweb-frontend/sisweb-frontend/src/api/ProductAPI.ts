import api from ".";
import { Product } from "my-types";

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
import api from ".";
import { Product } from "my-types";

//ADD A PRODUCT
export const addProduct = async (nombre: string, cantidad: number, productTypeId: number): Promise<number | undefined> => {
  try {
      const res = await api.post(`/product/`, { nombre, cantidad, productTypeId });
      return res.data.payload?.id;
  } catch (err) {
      console.error("Failed to create product:", err);
      return undefined;
  }
};

// UPDATE A PRODUCT (CON PATCH)
export const updateProduct = async (
    id: number,
    nombre?: string,
    cantidad?: number,
    productTypeId?: number
  ) => {
    try {
      const updateData: any = {};
      if (nombre) updateData.nombre = nombre;
      if (cantidad !== undefined) updateData.cantidad = cantidad;
      if (productTypeId !== undefined) updateData.productTypeId = productTypeId;
  
      const res = await api.patch(`/product/${id}`, updateData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("Product updated successfully:", res.data);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };  

  
//GET ALL PRODUCTS
export const getAllProducts = async () => {
try {
const res = await api.get('/product');
console.log(res.data); 
const products: Product[] = await res.data.payload;
return products;
} catch (err) {
console.log(err);
}
};

// GET PRODUCT BY ID
export const getProductById = async (id: number) => {
    try {
      const res = await api.get(`/product/${id}`);
      return res.data.payload; 
    } catch (err) {
      console.error("Error fetching product:", err);
      return null;
    }
  };
  

//DELETE A PRODUCT
export const deleteProduct = async (productId: number): Promise<void> => {
  try {
      await api.delete(`/product/${productId}`);
  } catch (err) {
      console.error("Failed to delete product:", err);
      throw err;
  }
};

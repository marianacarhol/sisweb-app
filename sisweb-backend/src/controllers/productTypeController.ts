import { RequestHandler, Request, Response } from "express";
import { ProductType } from "../models/productType";
import { Product } from "../models/product";

// Función para filtrar por tipos de productos dependiendo del id de params
export const getProductIdsByProductType: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const productTypeId = Number(req.params.productTypeId)

    if (isNaN(productTypeId)) {
        res.status(400).json({
            status: "error",
            message: "Invalid ProductType ID",
            payload: null,
        });
        return;
    }

    try {
        const products = await Product.findAll({
            where: { productTypeId }, // Filtra por el tipo de producto
            attributes: ['id'], // Solo obtiene los IDs
        });

        const productIds = products.map(product => product.id); // Extrae los IDs
        res.status(200).json({
            status: "success",
            message: "Product IDs successfully retrieved",
            payload: productIds,
        });
    } catch (error: any) {
        res.status(500).json({
            status: "error",
            message: "Something happened retrieving product IDs. " + error.message,
            payload: null,
        });
    }
};

// Create and Save a new Product
export const createProductType: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
    return;
  }

  try {
    const productType = { ...req.body };
    const data = await ProductType.create(productType);
    res.status(200).json({
      status: "success",
      message: "Product type successfully created",
      payload: data,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Something happened creating a product type. " + err.message,
      payload: null,
    });
  }
};
  

// Retrieve all Products from the database.
export const getAllProductTypes: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: ProductType[] = await ProductType.findAll();
    res.status(200).json({
      status: "success",
      message: "Product Types successfully retrieved",
      payload: data,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Something happened retrieving all product types. " + err.message,
      payload: null,
    });
  }
};

// Find a single Product with an id
export const getProductTypeById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: ProductType | null = await ProductType.findByPk(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Product type successfully retrieved",
      payload: data,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Something happened retrieving the product type. " + err.message,
      payload: null,
    });
  }
};
  
// Update a Product by the id in the request
export const modifyProductType: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty.",
      payload: null,
    });
    return;
  }

  try {
    // Product.update devuelve un array, donde la primera posición es la cantidad de filas actualizadas.
    const [updated] = await ProductType.update({ ...req.body }, { where: { id: req.params.id } });
    if (updated) {
      res.status(200).json({
        status: "success",
        message: "Product type successfully updated",
        payload: { ...req.body },
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Something happened updating the product type.",
        payload: null,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Something happened updating a product type. " + err.message,
      payload: null,
    });
  }
}; 

// Delete a Product with the specified id in the request
export const deleteProductType: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  try {
    await ProductType.destroy({ where: { id } });
    res.status(200).json({ message: "Product type deleted" });
  } catch (error: any) {
    res.status(500).json({
      message: "Error deleting product type",
      error: error.message || error,
    });
  }
};

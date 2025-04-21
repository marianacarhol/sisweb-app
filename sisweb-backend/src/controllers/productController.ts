import { RequestHandler, Request, Response } from "express";
import { Product } from "../models/product";


// Create and Save a new Product
export const createProduct: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      message: "Content can not be empty",
      payload: null,
    });
    return;
  }

  try {
    const product = { ...req.body };
    const data = await Product.create(product);
    res.status(200).json({
      status: "success",
      message: "Product successfully created",
      payload: data,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Something happened creating a product. " + err.message,
      payload: null,
    });
  }
};
  

// Retrieve all Products from the database
export const getAllProducts: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Product[] = await Product.findAll();
    res.status(200).json({
      status: "success",
      message: "Products successfully retrieved",
      payload: data,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Something happened retrieving all products. " + err.message,
      payload: null,
    });
  }
};

// Find a single Product with an id
export const getProductById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Product | null = await Product.findByPk(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Product successfully retrieved",
      payload: data,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Something happened retrieving the product. " + err.message,
      payload: null,
    });
  }
};
  
// Update a Product by the id in the request
export const modifyProduct: RequestHandler = async (req: Request, res: Response): Promise<void> => {
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
    const [updated] = await Product.update({ ...req.body }, { where: { id: req.params.id } });
    if (updated) {
      res.status(200).json({
        status: "success",
        message: "Product successfully updated",
        payload: { ...req.body },
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Something happened updating the product.",
        payload: null,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Something happened updating a product. " + err.message,
      payload: null,
    });
  }
}; 

// Delete a Product with the specified id in the request
export const deleteProduct: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    await Product.destroy({ where: { id } });
    res.status(200).json({ message: "Product deleted" });
  } catch (error: any) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message || error,
    });
  }
};

// GET /api/product/chart
export const getChartData: RequestHandler = async (_req, res) => {
  try {
    const data = await Product.findAll({
      attributes: ['nombre', 'cantidad']
    });
    res.status(200).json({
      status: 'success',
      message: 'Chart data retrieved',
      payload: data
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving chart data: ' + err.message,
      payload: null
    });
  }
};

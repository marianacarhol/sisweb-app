"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductType = exports.modifyProductType = exports.getProductTypeById = exports.getAllProductTypes = exports.createProductType = exports.getProductIdsByProductType = void 0;
const productType_1 = require("../models/productType");
const product_1 = require("../models/product");
// Función para filtrar por tipos de productos dependiendo del id de params
const getProductIdsByProductType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productTypeId = Number(req.params.productTypeId);
    if (isNaN(productTypeId)) {
        res.status(400).json({
            status: "error",
            message: "Invalid ProductType ID",
            payload: null,
        });
        return;
    }
    try {
        const products = yield product_1.Product.findAll({
            where: { productTypeId }, // Filtra por el tipo de producto
            attributes: ['id'], // Solo obtiene los IDs
        });
        const productIds = products.map(product => product.id); // Extrae los IDs
        res.status(200).json({
            status: "success",
            message: "Product IDs successfully retrieved",
            payload: productIds,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Something happened retrieving product IDs. " + error.message,
            payload: null,
        });
    }
});
exports.getProductIdsByProductType = getProductIdsByProductType;
// Create and Save a new Product
const createProductType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
        return;
    }
    try {
        const productType = Object.assign({}, req.body);
        const data = yield productType_1.ProductType.create(productType);
        res.status(200).json({
            status: "success",
            message: "Product type successfully created",
            payload: data,
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something happened creating a product type. " + err.message,
            payload: null,
        });
    }
});
exports.createProductType = createProductType;
// Retrieve all Products from the database.
const getAllProductTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield productType_1.ProductType.findAll();
        res.status(200).json({
            status: "success",
            message: "Product Types successfully retrieved",
            payload: data,
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something happened retrieving all product types. " + err.message,
            payload: null,
        });
    }
});
exports.getAllProductTypes = getAllProductTypes;
// Find a single Product with an id
const getProductTypeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield productType_1.ProductType.findByPk(req.params.id);
        res.status(200).json({
            status: "success",
            message: "Product type successfully retrieved",
            payload: data,
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something happened retrieving the product type. " + err.message,
            payload: null,
        });
    }
});
exports.getProductTypeById = getProductTypeById;
// Update a Product by the id in the request
const modifyProductType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const [updated] = yield productType_1.ProductType.update(Object.assign({}, req.body), { where: { id: req.params.id } });
        if (updated) {
            res.status(200).json({
                status: "success",
                message: "Product type successfully updated",
                payload: Object.assign({}, req.body),
            });
        }
        else {
            res.status(500).json({
                status: "error",
                message: "Something happened updating the product type.",
                payload: null,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something happened updating a product type. " + err.message,
            payload: null,
        });
    }
});
exports.modifyProductType = modifyProductType;
// Delete a Product with the specified id in the request
const deleteProductType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        yield productType_1.ProductType.destroy({ where: { id } });
        res.status(200).json({ message: "Product type deleted" });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting product type",
            error: error.message || error,
        });
    }
});
exports.deleteProductType = deleteProductType;

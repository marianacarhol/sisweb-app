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
exports.getAreaChartData = exports.getChartData = exports.deleteProduct = exports.modifyProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const product_1 = require("../models/product");
// Create and Save a new Product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
        return;
    }
    try {
        const product = Object.assign({}, req.body);
        const data = yield product_1.Product.create(product);
        res.status(200).json({
            status: "success",
            message: "Product successfully created",
            payload: data,
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something happened creating a product. " + err.message,
            payload: null,
        });
    }
});
exports.createProduct = createProduct;
// Retrieve all Products from the database
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield product_1.Product.findAll();
        res.status(200).json({
            status: "success",
            message: "Products successfully retrieved",
            payload: data,
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something happened retrieving all products. " + err.message,
            payload: null,
        });
    }
});
exports.getAllProducts = getAllProducts;
// Find a single Product with an id
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield product_1.Product.findByPk(req.params.id);
        res.status(200).json({
            status: "success",
            message: "Product successfully retrieved",
            payload: data,
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something happened retrieving the product. " + err.message,
            payload: null,
        });
    }
});
exports.getProductById = getProductById;
// Update a Product by the id in the request
const modifyProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const [updated] = yield product_1.Product.update(Object.assign({}, req.body), { where: { id: req.params.id } });
        if (updated) {
            res.status(200).json({
                status: "success",
                message: "Product successfully updated",
                payload: Object.assign({}, req.body),
            });
        }
        else {
            res.status(500).json({
                status: "error",
                message: "Something happened updating the product.",
                payload: null,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something happened updating a product. " + err.message,
            payload: null,
        });
    }
});
exports.modifyProduct = modifyProduct;
// Delete a Product with the specified id in the request
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield product_1.Product.destroy({ where: { id } });
        res.status(200).json({ message: "Product deleted" });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting product",
            error: error.message || error,
        });
    }
});
exports.deleteProduct = deleteProduct;
// GET /api/product/chart
const getChartData = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield product_1.Product.findAll({
            attributes: ['nombre', 'cantidad']
        });
        res.status(200).json({
            status: 'success',
            message: 'Chart data retrieved',
            payload: data
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error retrieving chart data: ' + err.message,
            payload: null
        });
    }
});
exports.getChartData = getChartData;
// GET /api/product/chart
const getAreaChartData = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield product_1.Product.findAll({
            attributes: ['nombre', 'createdAt']
        });
        res.status(200).json({
            status: 'success',
            message: 'Chart data retrieved',
            payload: data
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error retrieving chart data: ' + err.message,
            payload: null
        });
    }
});
exports.getAreaChartData = getAreaChartData;

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
exports.getAreaChartData = exports.deleteDonation = exports.modifyDonation = exports.getDonationById = exports.getAllDonations = exports.createDonation = void 0;
const donation_1 = require("../models/donation");
const person_1 = require("../models/person");
const product_1 = require("../models/product");
// Create and Save a new Donation
const createDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
        return;
    }
    try {
        const donation = Object.assign({}, req.body);
        const data = yield donation_1.Donation.create(donation);
        res.status(200).json({
            status: "success",
            message: "Donation successfully created",
            payload: data,
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something happened creating a donation. " + err.message,
            payload: null,
        });
    }
});
exports.createDonation = createDonation;
// Retrieve all Donations from the database.
const getAllDonations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield donation_1.Donation.findAll({ include: [person_1.Person, product_1.Product] });
        res.status(200).json({
            status: "success",
            message: "All donations successfully retrieved",
            payload: data,
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something happened retrieving all donations. " + err.message,
            payload: null,
        });
    }
});
exports.getAllDonations = getAllDonations;
// Find a single Donation with an id
const getDonationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield donation_1.Donation.findByPk(req.params.id, { include: [person_1.Person, product_1.Product] });
        res.status(200).json({
            status: "success",
            message: "Donation successfully retrieved",
            payload: data,
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something happened retrieving donation. " + err.message,
            payload: null,
        });
    }
});
exports.getDonationById = getDonationById;
// Update a Donation by the id in the request
const modifyDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
        return;
    }
    try {
        const [updated] = yield donation_1.Donation.update(Object.assign({}, req.body), { where: { id: req.params.id } });
        if (updated) {
            res.status(200).json({
                status: "success",
                message: "Donation successfully updated",
                payload: Object.assign({}, req.body),
            });
        }
        else {
            res.status(500).json({
                status: "error",
                message: "Something happened updating donation.",
                payload: null,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something happened updating donation. " + err.message,
            payload: null,
        });
    }
});
exports.modifyDonation = modifyDonation;
// Delete a Donation with the specified id in the request
const deleteDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield donation_1.Donation.destroy({ where: { id } });
        res.status(200).json({ message: "Donation deleted" });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting donation",
            error: error.message || error,
        });
    }
});
exports.deleteDonation = deleteDonation;
// GET /api/product/chart
const getAreaChartData = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield donation_1.Donation.findAll({
            attributes: ['cantidad', 'updatedAt']
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

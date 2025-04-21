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
exports.deletePerson = exports.modifyPerson = exports.getPersonById = exports.getAllPerson = exports.createPerson = void 0;
const person_1 = require("../models/person");
const donation_1 = require("../models/donation");
// Create and Save a new Person
const createPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content can not be empty",
            payload: null,
        });
        return;
    }
    try {
        const person = Object.assign({}, req.body);
        const data = yield person_1.Person.create(person);
        res.status(200).json({
            status: "success",
            message: "Product successfully created",
            payload: data,
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something happened creating a person. " + err.message,
            payload: null,
        });
    }
});
exports.createPerson = createPerson;
// Retrieve all People from the database.
const getAllPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield person_1.Person.findAll({ include: [donation_1.Donation] });
        res.status(200).json({
            status: "success",
            message: "All people successfully retrieved",
            payload: data,
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something happened retrieving all people. " + err.message,
            payload: null,
        });
    }
});
exports.getAllPerson = getAllPerson;
// Find a single Person with an id
const getPersonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield person_1.Person.findByPk(req.params.id, { include: [donation_1.Donation] });
        res.status(200).json({
            status: "success",
            message: "Person successfully retrieved",
            payload: data,
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something happened retrieving person. " + err.message,
            payload: null,
        });
    }
});
exports.getPersonById = getPersonById;
// Update a Person by the id in the request
const modifyPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "Content can not be empty.",
            payload: null,
        });
        return;
    }
    try {
        const [updated] = yield person_1.Person.update(Object.assign({}, req.body), { where: { id: req.params.id } });
        if (updated) {
            res.status(200).json({
                status: "success",
                message: "Person successfully updated",
                payload: Object.assign({}, req.body),
            });
        }
        else {
            res.status(500).json({
                status: "error",
                message: "Something happened updating person.",
                payload: null,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: "Something happened updating person. " + err.message,
            payload: null,
        });
    }
});
exports.modifyPerson = modifyPerson;
// Delete a Person with the specified id in the request
const deletePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        yield person_1.Person.destroy({ where: { id } });
        res.status(200).json({ message: "Person deleted" });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting person",
            error: error.message || error,
        });
    }
});
exports.deletePerson = deletePerson;

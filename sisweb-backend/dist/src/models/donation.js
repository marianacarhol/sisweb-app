"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donation = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const person_1 = require("../models/person");
const product_1 = require("../models/product");
let Donation = class Donation extends sequelize_typescript_1.Model {
};
exports.Donation = Donation;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => person_1.Person),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Donation.prototype, "personId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_1.Product),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Donation.prototype, "productId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Donation.prototype, "cantidad", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Donation.prototype, "fecha", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => person_1.Person),
    __metadata("design:type", person_1.Person)
], Donation.prototype, "persona", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_1.Product),
    __metadata("design:type", product_1.Product)
], Donation.prototype, "producto", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Donation.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Donation.prototype, "updatedAt", void 0);
exports.Donation = Donation = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'Donations'
    })
], Donation);

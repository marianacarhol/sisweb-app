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
exports.Product = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const donation_1 = require("../models/donation");
const productType_1 = require("./productType");
let Product = class Product extends sequelize_typescript_1.Model {
};
exports.Product = Product;
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Product.prototype, "nombre", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Product.prototype, "cantidad", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => donation_1.Donation, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Product.prototype, "donaciones", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => productType_1.ProductType),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Product.prototype, "productTypeId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => productType_1.ProductType, { onDelete: 'CASCADE' }),
    __metadata("design:type", productType_1.ProductType)
], Product.prototype, "productType", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
exports.Product = Product = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "Products"
    })
], Product);

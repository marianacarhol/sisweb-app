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
const sequelize_typescript_1 = require("sequelize-typescript");
const product_1 = require("../src/models/product");
const person_1 = require("../src/models/person");
const donation_1 = require("../src/models/donation");
const productType_1 = require("../src/models/productType");
const connection = new sequelize_typescript_1.Sequelize({
    database: 'sisweb_db',
    dialect: 'mysql',
    username: 'sisweb_user',
    password: '123456',
    host: 'localhost',
    port: 3306,
    //storage: ':memory:',
    models: [
        product_1.Product,
        person_1.Person,
        donation_1.Donation,
        productType_1.ProductType
    ]
});
function connectionDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection.sync();
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.default = connectionDB;

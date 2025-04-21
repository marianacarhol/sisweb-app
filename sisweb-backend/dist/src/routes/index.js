"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRoutes_1 = __importDefault(require("./productRoutes"));
const personRoutes_1 = __importDefault(require("./personRoutes"));
const donationRoutes_1 = __importDefault(require("./donationRoutes"));
const productTypeRoutes_1 = __importDefault(require("./productTypeRoutes"));
const apiRouter = (0, express_1.Router)();
apiRouter.use('/product', productRoutes_1.default);
apiRouter.use('/person', personRoutes_1.default);
apiRouter.use('/donation', donationRoutes_1.default);
apiRouter.use('/product-type', productTypeRoutes_1.default);
apiRouter.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = apiRouter;

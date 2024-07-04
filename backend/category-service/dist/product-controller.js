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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getProducts = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("./product-model"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        // Check if productData has the required fields
        if (productData && productData.name) {
            const newProduct = new product_model_1.default(productData);
            const savedProduct = yield newProduct.save();
            res.status(201).json(savedProduct);
        }
        else {
            res.status(400).json({ error: "Missing required product fields" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not create product." });
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getProducts = getProducts;
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield product_model_1.default.findOneAndDelete({
            _id: productId,
        });
        return deletedProduct;
    }
    catch (error) {
        console.error(error);
        return error;
    }
});
exports.deleteProduct = deleteProduct;

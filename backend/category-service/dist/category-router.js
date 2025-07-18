"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category-controller");
const router = express_1.default.Router();
router.get("/category", category_controller_1.getCategories);
router.post("/category", category_controller_1.createCategory);
router.put("/category", category_controller_1.updateCategory);
router.delete("/category", category_controller_1.deleteCategory);
exports.default = router;

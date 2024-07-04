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
exports.deleteCategory = exports.updateCategory = exports.getCategories = exports.createCategory = void 0;
const category_model_1 = __importDefault(require("./category-model"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryData = req.body;
        // Check if categoryData has the required fields
        if (categoryData && categoryData.name) {
            const newCategory = new category_model_1.default(categoryData);
            const savedCategory = yield newCategory.save();
            res.status(201).json(savedCategory);
        }
        else {
            res.status(400).json({ error: "Missing required category fields" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not create category." });
    }
});
exports.createCategory = createCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_model_1.default.find();
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500);
        res.json({
            error: "An unexpected error occurred while getting the categories. Please try again later.",
        });
    }
});
exports.getCategories = getCategories;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryData = req.body;
        const categoryId = req.params.id;
        if (categoryData && categoryData.name) {
            const updatedCategory = category_model_1.default.findOneAndUpdate({ _id: categoryId }, {
                $set: {
                    name: categoryData.name,
                },
            }, { new: true });
            res.status(201).send(updatedCategory);
        }
    }
    catch (error) {
        res.status(500);
        res.json({
            error: "An unexpected error occurred while editing the category. Please try again later.",
        });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    try {
        const deletedCategory = yield category_model_1.default.findOneAndDelete({
            _id: categoryId,
        });
        res.status(204).json({ msg: "Category deleted" });
        return deletedCategory;
    }
    catch (error) {
        res.status(500).json({
            error: "An unexpected error occurred while deleting the catgeory",
        });
    }
});
exports.deleteCategory = deleteCategory;

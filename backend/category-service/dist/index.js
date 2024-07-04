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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const category_router_1 = __importDefault(require("./category-router"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const port = config_1.default.port;
const dbUrl = `${config_1.default.dbUrl}${config_1.default.dbNameProd}`;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(category_router_1.default);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(dbUrl);
            console.log("Category database successfully connected to server 🚀");
            app.listen(port, () => {
                console.log(`Category server listening on port ${port}`);
            });
        }
        catch (error) {
            console.log("🔥 Error in the category database connection.", error);
        }
    });
}
main();
exports.default = mongoose_1.default;

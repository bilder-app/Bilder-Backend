"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const person_1 = __importDefault(require("./person"));
const product_1 = __importDefault(require("./product"));
const order_1 = __importDefault(require("./order"));
const category_1 = __importDefault(require("./category"));
router.use("/category", category_1.default);
router.use("/order", order_1.default);
router.use("/category", category_1.default);
router.use("/product", product_1.default);
router.use("/person", person_1.default);
exports.default = router;

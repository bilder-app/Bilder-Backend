"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const order_1 = __importDefault(require("./Api/Routes/order"));
const product_1 = __importDefault(require("./Api/Routes/product"));
const favorite_1 = __importDefault(require("./Api/Routes/favorite"));
const category_1 = __importDefault(require("./Api/Routes/category"));
const router_1 = __importDefault(require("./Dev/router"));
router.use("/cart", order_1.default);
router.use("/category", category_1.default);
router.use("/favorite", favorite_1.default);
router.use("/dev", router_1.default);
router.use("/product", product_1.default);
exports.default = router;

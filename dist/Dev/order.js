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
const Order_1 = __importDefault(require("../Models/Order"));
const ProductInCart_1 = __importDefault(require("../Models/ProductInCart"));
const router = express_1.default.Router();
router.put("/product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.body;
    const order = yield Order_1.default.findOne({ where: { userId } });
    yield ProductInCart_1.default.create({
        amount: 1,
        price: 1,
        orderId: order.id,
        productId
    });
    res.sendStatus(200);
}));
exports.default = router;

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
const router = express_1.default.Router();
const orderController_1 = require("../Controllers/orderController");
router.get("/", (req, res) => orderController_1.getAllCartProducts().then((resp) => res.json(resp)));
router.put("/clear/", (req, res) => orderController_1.clearAllCartProducts().then(() => res.json()));
router.put("/product/:productId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return orderController_1.addProductToCart(+req.params.productId, req.body.amount).then((resp) => res.sendStatus(200));
}));
router.delete("/product/:productId", (req, res) => orderController_1.removeProductFromOrder(+req.params.productId).then((resp) => res.sendStatus(200)));
router.get("/amount", (req, res) => orderController_1.getAllCartProducts().then((resp) => {
    const cantidad = resp.map((item) => item.amount);
    var total = cantidad.reduce(function (a, b) {
        return a + b;
    });
    res.json(total);
}));
exports.default = router;

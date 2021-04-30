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
exports.clearAllCartProducts = exports.addProductToCart = exports.removeProductFromOrder = exports.getAllCartProducts = void 0;
const Order_1 = __importDefault(require("../../Models/Order"));
const Product_1 = __importDefault(require("../../Models/Product"));
const ProductInCart_1 = __importDefault(require("../../Models/ProductInCart"));
//temporary
const userId = 1;
function getAllCartProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        return Order_1.default.findOne({
            where: { userId: userId, state: "pending" },
            include: [
                {
                    model: Product_1.default,
                    attributes: { exclude: ["createdAt", "updatedAt", "price"] },
                    through: { attributes: ["amount", "price"] }
                }
            ]
        }).then((resp) => {
            if (!resp)
                return [];
            return resp.products.map((prod) => {
                prod = prod.toJSON();
                prod = Object.assign(Object.assign({}, prod), prod.ProductInCart);
                delete prod.ProductInCart;
                return prod;
            });
        });
    });
}
exports.getAllCartProducts = getAllCartProducts;
function removeProductFromOrder(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield Order_1.default.findOne({
            where: { state: "pending", userId },
            include: [{ model: Product_1.default, through: { attributes: [] } }]
        });
        return order === null || order === void 0 ? void 0 : order.$remove("product", productId);
    });
}
exports.removeProductFromOrder = removeProductFromOrder;
function addProductToCart(productId, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = (yield Order_1.default.findOne({
            where: { userId: userId, state: "pending" }
        })); // TODO fix this
        const product = (yield Product_1.default.findByPk(productId)); // TODO fix this
        const [productInCart, wasJustCreated] = yield ProductInCart_1.default.findOrCreate({
            where: { orderId: order.id, productId },
            defaults: {
                amount,
                price: product.price
            }
        });
        if (wasJustCreated)
            return;
        productInCart.amount = amount;
        productInCart.price = product.price;
        return yield productInCart.save();
    });
}
exports.addProductToCart = addProductToCart;
function clearAllCartProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        return Order_1.default.findOne({
            where: { userId: userId, state: "pending" }
        }).then((resp) => {
            if (!resp)
                return;
            else
                return resp.$set("products", []);
        });
    });
}
exports.clearAllCartProducts = clearAllCartProducts;

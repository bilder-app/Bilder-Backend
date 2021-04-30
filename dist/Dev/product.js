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
const Product_1 = __importDefault(require("../Models/Product"));
const faker_1 = __importDefault(require("faker"));
const Category_1 = __importDefault(require("../Models/Category"));
router.post("/:amount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.params;
    const products = [];
    for (let i = 0; i < +amount; i++) {
        const productName = faker_1.default.commerce.product();
        const images = [];
        for (let i = 0; i < ~~(Math.random() * 4) + 1; i++) {
            images.push(faker_1.default.image.technics(600, 600));
        }
        products.push({
            name: productName,
            price: +faker_1.default.commerce.price(1, 100),
            stock: ~~(Math.random() * 150),
            description: faker_1.default.commerce.productDescription(),
            shortDescription: faker_1.default.commerce.productAdjective(),
            images: images
        });
    }
    yield Product_1.default.bulkCreate(products);
    res.sendStatus(200);
}));
router.get("/associate/category/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.default.findAll();
    const categories = yield (yield Category_1.default.findAll()).map((cat) => cat.name);
    const randomIdx = () => ~~(Math.random() * categories.length);
    yield products.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
        yield product.$set("categories", [
            categories[randomIdx()],
            categories[randomIdx()]
        ]);
    }));
    res.sendStatus(200);
}));
exports.default = router;

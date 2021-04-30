"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const productController_1 = require("../Controllers/productController");
//Devuelve todos los productos
router.get("/", (req, res) => productController_1.getAllProducts().then((resp) => res.json(resp)));
//Devuelve resultados por query
router.get("/search", ({ query: { name, limit, page } }, res) => {
    if (!name)
        return res.sendStatus(400);
    productController_1.paginatedSearchProducts({
        name: name,
        page: +page,
        limit: +limit
    })
        .catch((err) => {
        console.log(err);
        res.sendStatus(400);
    })
        .then((resp) => res.json(resp));
});
router.get("/category", ({ query: { names: categoriesString } }, res) => {
    if (!categoriesString)
        return res.sendStatus(400);
    const categories = categoriesString && categoriesString.toString().split(",");
    if (categories === [""] || categories === "")
        return res.sendStatus(400);
    productController_1.searchByCategories(categories).then((resp) => res.json(resp));
});
//Devuelve un producto
router.get("/:id", (req, res) => {
    const { id } = req.params;
    productController_1.getProduct(id)
        .then((resp) => res.json(resp))
        .catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});
//Crea un producto
router.post("/", (req, res) => {
    const { nombre, descripcion, descripcionCorta, precio, stock } = req.body;
    productController_1.addProduct(nombre, descripcion, descripcionCorta, precio, stock)
        .then((resp) => res.json(resp))
        .catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});
exports.default = router;

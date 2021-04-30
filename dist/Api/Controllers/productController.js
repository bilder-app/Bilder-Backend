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
exports.searchByCategories = exports.paginatedSearchProducts = exports.addProduct = exports.getProduct = exports.getAllProducts = void 0;
const sequelize_1 = require("sequelize");
const Category_1 = __importDefault(require("../../Models/Category"));
const Product_1 = __importDefault(require("../../Models/Product"));
const utils_1 = require("../../utils");
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        return Product_1.default.findAll({
            include: [{ model: Category_1.default, through: { attributes: [] } }]
        });
    });
}
exports.getAllProducts = getAllProducts;
function getProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return Product_1.default.findOne({ where: { id } });
    });
}
exports.getProduct = getProduct;
function addProduct(name, description, shortDescription, price, stock) {
    return __awaiter(this, void 0, void 0, function* () {
        return Product_1.default.findOrCreate({
            where: {
                name,
                description,
                shortDescription,
                price,
                stock: stock,
                images: [
                    "https://images.app.goo.gl/RcgLkEbTz1aRegpeA",
                    "https://images.app.goo.gl/oXwgPP32RdmAkd6T7"
                ]
            }
        });
    });
}
exports.addProduct = addProduct;
function paginatedSearchProducts({ name, page, limit = 5 }) {
    return __awaiter(this, void 0, void 0, function* () {
        const productsAmount = yield Product_1.default.count({
            where: { name: { [sequelize_1.Op.iLike]: `%${name}%` } }
        });
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let next = undefined;
        let previous = undefined;
        if (startIndex > 0) {
            previous = {
                page: page - 1,
                limit
            };
        }
        if (endIndex < productsAmount) {
            next = {
                page: page + 1,
                limit
            };
        }
        const totalPaginationPages = productsAmount % limit === 0
            ? productsAmount / limit
            : ~~(productsAmount / limit) + 1;
        return Product_1.default.findAndCountAll({
            where: {
                name: { [sequelize_1.Op.iLike]: `%${name}%` }
            },
            order: [["name", "ASC"]],
            limit,
            offset: Math.max(0, startIndex)
        }).then((resp) => ({
            totalProducts: productsAmount,
            totalPaginationPages,
            next,
            previous,
            products: resp.rows
        }));
    });
}
exports.paginatedSearchProducts = paginatedSearchProducts;
function searchByCategories(categories) {
    return __awaiter(this, void 0, void 0, function* () {
        categories = categories.map((cat) => utils_1.removeDiacritics(cat));
        return Product_1.default.findAll({
            where: {
                "$categories.name$": {
                    [sequelize_1.Op.or]: categories.map((cat) => ({ [sequelize_1.Op.iLike]: cat }))
                }
            },
            include: [
                {
                    model: Category_1.default,
                    through: { attributes: [] },
                    attributes: [],
                    as: "categories"
                }
            ]
        }).then((prods) => __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(prods.map((prod) => __awaiter(this, void 0, void 0, function* () {
                const newProdData = Object.assign({}, prod.toJSON());
                const categories = yield prod.$get("categories");
                return Object.assign(Object.assign({}, newProdData), { categories });
            })));
        }));
    });
}
exports.searchByCategories = searchByCategories;

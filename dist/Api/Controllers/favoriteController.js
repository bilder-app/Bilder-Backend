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
exports.removeProductFromUsersFavorite = exports.addProductToUsersFavorite = exports.getAllUsersFavoriteProducts = void 0;
const Person_1 = __importDefault(require("../../Models/Person"));
//temporary
const userId = 1;
function getAllUsersFavoriteProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO: User middleware
        const user = yield Person_1.default.findOne({ where: { userId: userId } });
        return yield (user === null || user === void 0 ? void 0 : user.$get("favorites", {
            //@ts-ignore
            joinTableAttributes: []
        }));
    });
}
exports.getAllUsersFavoriteProducts = getAllUsersFavoriteProducts;
function addProductToUsersFavorite(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO: User middleware
        const user = yield Person_1.default.findOne({ where: { userId: userId } });
        return yield (user === null || user === void 0 ? void 0 : user.$add("favorite", productId));
    });
}
exports.addProductToUsersFavorite = addProductToUsersFavorite;
function removeProductFromUsersFavorite(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO: User middleware
        const user = yield Person_1.default.findOne({ where: { userId: userId } });
        return yield (user === null || user === void 0 ? void 0 : user.$set("favorites", (yield (user === null || user === void 0 ? void 0 : user.$get("favorites"))).filter((prod) => prod.id !== productId)));
    });
}
exports.removeProductFromUsersFavorite = removeProductFromUsersFavorite;

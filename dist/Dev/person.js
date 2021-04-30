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
const User_1 = __importDefault(require("../Models/User"));
const Person_1 = __importDefault(require("../Models/Person"));
const Order_1 = __importDefault(require("../Models/Order"));
// console.log(Object.keys(Object.getPrototypeOf(MODEL)));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield User_1.default.create(req.body, {
        fields: ["email", "password"]
    });
    const newPerson = yield Person_1.default.create({ name: "name", lastname: "lastName" });
    yield newUser.$set("person", newPerson);
    const newOrder = yield Order_1.default.create({ state: "pending" });
    yield newPerson.$add("order", newOrder);
    return res.sendStatus(200);
}));
exports.default = router;

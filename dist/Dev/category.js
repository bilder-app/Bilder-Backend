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
const Category_1 = __importDefault(require("../Models/Category"));
const faker_1 = __importDefault(require("faker"));
router.post("/:amount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.params;
    const categories = [];
    for (let i = 0; i < +amount; i++) {
        categories.push({
            name: faker_1.default.random.word() + " " + faker_1.default.random.uuid().substr(0, 4)
        });
    }
    yield Category_1.default.bulkCreate(categories);
    res.sendStatus(200);
}));
router.post("/", function (req, res) {
    const { name } = req.body;
    Category_1.default.findOrCreate({
        where: {
            name: name
        }
    })
        .then((resp) => res.send(resp))
        .catch((err) => res.status(400).json(err));
});
exports.default = router;

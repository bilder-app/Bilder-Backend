"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const categoryController_1 = require("../Controllers/categoryController");
router.get("/", (req, res) => categoryController_1.getAllCategories().then((resp) => res.json(resp)));
exports.default = router;

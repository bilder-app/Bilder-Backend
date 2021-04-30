import express from "express";
const router = express.Router();
import {
  getAllCategories
} from "../Controllers/categoryController";

router.get("/", (req, res) =>
 getAllCategories().then((resp) => res.json(resp))
);

export default router;


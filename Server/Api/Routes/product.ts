import express from "express";
const router = express.Router();
import {
  getProduct,
  paginatedSearchProducts,
  getAllProducts,
  addProduct,
  searchByCategories
} from "../Controllers/productController";

//Devuelve resultados por query
router.get("/category", ({ query: { names: categoriesString } }, res) => {
  if (!categoriesString) return res.sendStatus(400);
  const categories = categoriesString && categoriesString.toString().split(",");
  if (categories === [""] || categories === "") return res.sendStatus(400);
  searchByCategories(categories).then((resp) => res.json(resp));
});

export default router;

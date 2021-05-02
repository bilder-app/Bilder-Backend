import express from "express";
const router = express.Router();
import {
  getProduct,
  paginatedSearchProducts,
  getAllProducts,
  addProduct,
  searchByCategories
} from "../Controllers/productController";

//Devuelve todos los productos
router.get("/", (req, res) => getAllProducts().then((resp) => res.json(resp)));

//Devuelve resultados por query
router.get("/search", ({ query: { name, limit, page } }, res) => {
  if (!name) return res.sendStatus(400);
  paginatedSearchProducts({
    name: name as string,
    page: +page!,
    limit: +limit!
  })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    })
    .then((resp) => res.json(resp));
});

router.get("/category", ({ query: { names: categoriesString } }, res) => {
  if (!categoriesString) return res.sendStatus(400);
  const categories = categoriesString && categoriesString.toString().split(",");
  if (categories === [""] || categories === "") return res.sendStatus(400);
  searchByCategories(categories).then((resp) => res.json(resp));
});

//Devuelve un producto
router.get("/:id", (req, res) => {
  const { id } = req.params;
  getProduct(id)
    .then((resp) => res.json(resp))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

//Crea un producto
router.post("/", (req, res) => {
  const { name, description, price, stock } = req.body;
  addProduct({ name, description, price, stock })
    .then((resp) => res.json(resp))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

export default router;

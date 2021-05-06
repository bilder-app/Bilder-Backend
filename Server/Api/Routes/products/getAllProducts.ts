import Category from "../../../Models/Category";
import Product from "../../../Models/Product";
import { Router } from "express";

const ROUTE = "/products";

export default Router({ mergeParams: true }).get(ROUTE, (req, res) => {
  res.json(
    Product.findAll({
      include: [{ model: Category, through: { attributes: [] } }]
    })
  );
});

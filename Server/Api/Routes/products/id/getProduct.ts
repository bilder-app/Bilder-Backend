import Category from "../../../../Models/Category";
import Product from "../../../../Models/Product";
import { Router } from "express";

const ROUTE = "/products/:productId";

export default Router({ mergeParams: true }).get(ROUTE, (req, res) => {
  const { productId } = req.params;
  return Product.findByPk(productId);
});

import Category from "../../../../Models/Category";
import Product from "../../../../Models/Product";
import { Router } from "express";

const ROUTE = "/products/:productId";

export default Router({ mergeParams: true }).get(ROUTE, async (req, res) => {
  const { productId } = req.params;
   res.json(
    await Product.findByPk(productId)
  );
});

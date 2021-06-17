import { Router } from "express";
import ProductSubCategory from "../../../../Models/ProductSubCategory";

const ROUTE = "/categories/subcategory/:productId";

export default Router({ mergeParams: true }).put(
  ROUTE, 
  async (req, res) => {
  const { name } = req.body;
  const { productId } = req.params;

  await ProductSubCategory.findOrCreate({
    where: { productId: productId },
    defaults: { subcategory: name }
  })
  res.send(200);
});

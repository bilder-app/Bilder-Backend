import isBusiness from "../../../middleware/isBusiness";
import { Router } from "express";
import ProductSubCategory from "../../../../Models/ProductSubCategory";

const ROUTE = "/business/products";

export default Router({ mergeParams: true }).post(
  ROUTE,
  isBusiness,
  async (req, res) => {
    const product = await req.business!.$create("product", req.body);

    await ProductSubCategory.findOrCreate({
      where: { productId: product.id },
      defaults: { subcategory: req.body.subcategories }
    })
    res.sendStatus(200);
  }
);

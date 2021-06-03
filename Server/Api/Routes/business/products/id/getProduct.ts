import { Router } from "express";
import isBusiness from "../../../../middleware/isBusiness";

const ROUTE = "/business/products/:productId";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isBusiness,
  async (req, res) => {
    const { productId } = req.params;
    const [product] = await req.business!.$get("products", {
      where: { id: productId }
    });
    if (!product) return res.sendStatus(404);
    res.json(product);
  }
);
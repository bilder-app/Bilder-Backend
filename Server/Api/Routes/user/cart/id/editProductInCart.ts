import { Router } from "express";
import ProductInCart from "../../../../../Models/ProductInCart";
import isPerson from "../../../../middleware/isPerson";

const ROUTE = "/user/cart/:productId";

export default Router({ mergeParams: true }).put(
  ROUTE,
  isPerson,
  async (req, res) => {
    const { productId } = (req.params as unknown) as { productId: number };
    const product = await ProductInCart.findOne({
      where: { productId: productId }
    })
    if (!product) return res.sendStatus(404);
    const updatedProduct = await product.update(req.body, { returning: true });
    res.json(updatedProduct);
  }
)
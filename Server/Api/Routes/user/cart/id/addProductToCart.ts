import { Router } from "express";
import ProductInCart from "../../../../../Models/ProductInCart";
import isPerson from "../../../../middleware/isPerson";

const ROUTE = "/user/cart/:productId";

export default Router({ mergeParams: true }).post(
  ROUTE,
  isPerson,
  async (req, res) => {
    const { productId } = (req.params as unknown) as { productId: number };
    const cartProduct = await ProductInCart.create({
      productId,
      personId: req.person!.id,
      amount: 1
    });
    res.json(cartProduct);
  }
);

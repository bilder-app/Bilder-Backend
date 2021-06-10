import { Router } from "express";
import ProductInCart from "../../../../../Models/ProductInCart";
import isPerson from "../../../../middleware/isPerson";

const ROUTE = "/user/cart/:productId";

export default Router({ mergeParams: true }).put(
  ROUTE,
  isPerson,
  async (req, res) => {
    const { productId } = req.params as unknown as { productId: number };
    const { amount } = req.body;
    await ProductInCart.findOrCreate({
      where: {
        personId: req.user!.id,
        productId
      },
      defaults: {
        amount: 1
      }
    });
    await ProductInCart.update(
      {
        amount
      },
      {
        where: {
          personId: req.user!.id,
          productId
        },
        returning: true
      }
    );
    res.sendStatus(200);
  }
);

import { Router } from "express";
import isPerson from "../../../../middleware/isPerson";

const ROUTE = "/user/cart/:productId";

export default Router({ mergeParams: true }).post(
  ROUTE,
  isPerson,
  async (req, res) => {
    const { productId } = req.params;
    res.json(req.person!.$add("cartProducts", productId));
  }
);

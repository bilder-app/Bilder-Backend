import { Router } from "express";
import isPerson from "../../../../middleware/isPerson";

const ROUTE = "/user/cart/amount";

export default Router({ mergeParams: true }).delete(
  ROUTE,
  isPerson,
  async (req, res) => {
    const products = await req.person!.$get("cartProducts");
    if (!products) return res.status(200).send(0);
    const total = products.map((item) => item.amount).reduce((a, b) => a + b);
    res.status(200).send(total);
  }
);

import { Router } from "express";
import isPerson from "../../../middleware/isPerson";

const ROUTE = "/user/cart";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isPerson,
  async (req, res) => {
    const products = await req
      .person!.$get("cartProducts")
      .then((resp) => JSON.parse(JSON.stringify(resp)));

    const resp = products.map((prod: any) => {
      prod.amount = prod.ProductInCart.amount;
      delete prod.ProductInCart;
      return prod;
    });
    res.json(resp);
  }
);

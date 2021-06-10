import { Router } from "express";
import isPerson from "../../../../middleware/isPerson";

const ROUTE = "/user/cart/:productId";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isPerson,
  async (req, res) =>
    res.json(
      await req
        .person!.$get("cartProducts", {
          where: {
            id: req.params.productId
          }
        })
        .then((prods) => prods[0])
    )
);

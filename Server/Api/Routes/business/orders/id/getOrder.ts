import { Router } from "express";
import Product from "../../../../../Models/Product";
import isBusiness from "../../../../middleware/isBusiness";

const ROUTE = "/business/orders/:orderId";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isBusiness,
  async (req, res) => {
    res.json(
      await req
        .business!.$get("BusinessOrder", {
          where: { id: req.params.orderId },
          include: [{ model: Product }]
        })
        .then((orders) => orders[0])
    );
  }
);

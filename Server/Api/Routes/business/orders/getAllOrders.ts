import { Router } from "express";
import Product from "../../../../Models/Product";
import isBusiness from "../../../middleware/isBusiness";

const ROUTE = "/business/orders";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isBusiness,
  async (req, res) => {
    res.json(
      await req.business!.$get("BusinessOrder", {
        include: [{ model: Product }]
      })
    );
  }
);

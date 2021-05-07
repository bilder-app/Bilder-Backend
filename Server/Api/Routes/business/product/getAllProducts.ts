import isBusiness from "../../../middleware/isBusiness";
import { Router } from "express";

const ROUTE = "/business/products";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isBusiness,
  async (req, res) => {
    res.json(await req.business!.$get("products"));
  }
);

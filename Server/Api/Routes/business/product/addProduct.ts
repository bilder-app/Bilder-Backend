import isBusiness from "../../../middleware/isBusiness";
import { Router } from "express";

const ROUTE = "/business/products";

export default Router({ mergeParams: true }).post(
  ROUTE,
  isBusiness,
  async (req, res) => {
    await req.business!.$create("product", req.body);
    res.sendStatus(200);
  }
);

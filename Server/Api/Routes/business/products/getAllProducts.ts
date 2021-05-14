import isBusiness from "../../../middleware/isBusiness";
import { Router } from "express";
import Offer from "../../../../Models/Offer";

const ROUTE = "/business/products";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isBusiness,
  async (req, res) => {
    res.json(
      await req.business!.$get("products", {
        include: [{ model: Offer }],
        order: [["name", "ASC"]]
      })
    );
  }
);

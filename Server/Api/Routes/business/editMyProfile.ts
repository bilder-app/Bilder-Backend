import { Router } from "express";
import isBusiness from "../../middleware/isBusiness";

const ROUTE = "/me/business/edit";

export default Router({ mergeParams: true }).put(
  ROUTE,
  isBusiness,
  async (req, res) => {
    const business = req.business!;
    const updatedProduct = await business.update(req.body, { returning: true });
    res.json(updatedProduct);
  }
);

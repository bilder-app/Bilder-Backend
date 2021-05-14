import { Router } from "express";
import isBusiness from "../../middleware/isBusiness";

const ROUTE = "/business/me";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isBusiness,
  (req, res) => {
    const business = req.business;
    return res.json(business);
  }
);

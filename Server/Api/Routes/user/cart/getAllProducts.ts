import { Router } from "express";
import isPerson from "../../../middleware/isPerson";

const ROUTE = "/user/cart";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isPerson,
  async (req, res) => res.json(req.person!.$get("cartProducts"))
);

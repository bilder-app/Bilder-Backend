import { Router } from "express";
import isPerson from "../../../middleware/isPerson";

const ROUTE = "/user/favorites";

export default Router({ mergeParams: true }).post(
  ROUTE,
  isPerson,
  async (req, res) =>
    res.json(await req.person!.$add("favorites", req.body.productId))
);

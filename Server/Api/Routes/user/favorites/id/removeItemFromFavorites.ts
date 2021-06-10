import { Router } from "express";
import isPerson from "../../../../middleware/isPerson";

const ROUTE = "/user/favorites/:productId";

export default Router({ mergeParams: true }).delete(
  ROUTE,
  isPerson,
  async (req, res) =>
    res.json(await req.person!.$remove("favorites", req.params.productId))
);

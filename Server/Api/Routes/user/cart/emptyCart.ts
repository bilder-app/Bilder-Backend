import { Router } from "express";
import isPerson from "../../../middleware/isPerson";

const ROUTE = "/user/cart";

export default Router({ mergeParams: true }).delete(
  ROUTE,
  isPerson,
  async (req, res) => {
    await req.person!.$set("cartProducts", []);
    res.sendStatus(200);
  }
);

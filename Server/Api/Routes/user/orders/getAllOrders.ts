import { Router } from "express";
import Product from "../../../../Models/Product";
import Shipping from "../../../../Models/Shipping";
import isPerson from "../../../middleware/isPerson";

const ROUTE = "/user/orders";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isPerson,
  async (req, res) => {
    res.json(
      await req.person!.$get("orders", {
        include: [{ model: Product }, { model: Shipping }]
      })
    );
  }
);

import { Router } from "express";
import isPerson from "../../../../../middleware/isPerson";

const ROUTE = "/user/orders/:orderId/state";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isPerson,
  async (req, res) => {
    const { orderId } = req.params;
    const order = await req.person!.$get("orders", { where: { id: orderId } });
    if (!order) return res.sendStatus(404);
    res.json(order[0].state);
  }
);

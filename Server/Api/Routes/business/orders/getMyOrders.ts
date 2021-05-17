import { Router } from "express";
import Product from "../../../../Models/Product";
import Order from "../../../../Models/Order";
import isBusiness from "../../../middleware/isBusiness";

const ROUTE = "/business/orders/";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isBusiness,
  async (req, res) => {
    const result = await Order.findAll({
      where: { state: "completed" },
      include: {
        model: Product,
        where: { businessId: req.business!.id },
      },
    });
    res.json(result);
  }
);

import { Router } from "express";
import Product from "../../../../../Models/Product";
import Order from "../../../../../Models/Order";
import Shipping from "../../../../../Models/Shipping";
import isBusiness from "../../../../middleware/isBusiness";

const ROUTE = "/business/orders/:orderId";
 
export default Router({ mergeParams: true }).get(
  ROUTE,
  isBusiness,
  async (req, res) => {
    const { orderId } = req.params;
    const result = await Order.findOne({
      where: { id: orderId, state: "completed" },
      include: [
        {
          model: Product,
          where: { businessId: req.business.id } 
        },
        {
          model: Shipping
        }
      ]
    })
    res.json(result)
  }
);

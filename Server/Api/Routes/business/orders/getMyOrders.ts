import { Router } from "express";
import Product from "../../../../Models/Product";
import Order from "../../../../Models/Order";
import Shipping from "../../../../Models/Shipping";
import isBusiness from "../../../middleware/isBusiness";
import { Op } from "sequelize";

const ROUTE = "/business/orders/";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isBusiness,
  async (req, res) => {

    const filter = {
      "0": [
        { state: "preparing" },
        { state: "ready" }
      ],
      "1": { state: "sent" }
    }
    
    console.log(req.query)
    const result = await Order.findAll({
      where: { state: "completed" },
      include: [
        {
          model: Product,
          where: { businessId: req.business.id }
        },
        {
          model: Shipping,
          where: {
            [Op.or]: filter[req.query.filter]
          }
        }
        
      ]
    })
    res.json(result)
  }
);

import { Router } from "express";
import Person from "../../../../../Models/Person";
import Product from "../../../../../Models/Product";
import isBusiness from "../../../../middleware/isBusiness";

const ROUTE = "/business/orders/:orderId";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isBusiness,
  async (req, res) => {
    res.json(
      await req
        .business!.$get("BusinessOrder", {
          where: { id: req.params.orderId },
          include: [{ model: Product }]
        })
        .then(async (orders) => {
          const orderData = JSON.parse(JSON.stringify(orders[0]));
          const clientData = await Person.findByPk(orderData.clientId).then(
            (data) => data?.toJSON()
          );
          orderData.clientData = clientData;
          return orderData;
        })
    );
  }
);

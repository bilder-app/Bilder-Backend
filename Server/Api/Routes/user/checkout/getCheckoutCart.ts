import { Router } from "express";
import isPerson from "../../../middleware/isPerson";
import User from "../../../../Models/User";
import Business from "../../../../Models/Business";

const ROUTE = "/user/checkout/cart";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isPerson,
  async (req, res) => {
    const products = await req.person!.$get("cartProducts", {
      include: [{ model: Business }]
    });

    const productsSeparated: any = {};

    products.forEach((product) => {
      //@ts-ignore
      const businessId = product.business.id;
      if (productsSeparated[businessId]) {
        productsSeparated[businessId].push(product);
      } else {
        productsSeparated[businessId] = [product];
      }
    });

    res.json(productsSeparated);
  }
);

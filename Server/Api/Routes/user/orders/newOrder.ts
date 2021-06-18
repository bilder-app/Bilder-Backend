import { Router } from "express";
import isPerson from "../../../middleware/isPerson";
import Order from "../../../../Models/Order";
import ProductInOrder from "../../../../Models/ProductInOrder";

const ROUTE = "/user/orders";

export default Router({ mergeParams: true }).post(
  ROUTE,
  isPerson,
  async (req, res) => {
    const cartProds = await req.person!.$get("cartProducts");
    const newOrder = await Order.create({ userId: req.person!.id });
    await newOrder.$create("shipping", { state: "preparing" });
    cartProds.forEach(async (product) => {
      await ProductInOrder.create({
        productId: product!.id,
        orderId: newOrder!.id,
        //@ts-ignore
        price: product.price,
        //@ts-ignore
        amount: product.ProductInCart.amount
      });
    });
    await req.person!.$set("cartProducts", []);
    res.sendStatus(200);
  }
);

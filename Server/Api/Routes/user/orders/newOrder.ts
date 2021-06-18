import { Router } from "express";
import isPerson from "../../../middleware/isPerson";
import Order from "../../../../Models/Order";
import ProductInOrder from "../../../../Models/ProductInOrder";
import BusinessOrder from "../../../../Models/BusinessOrder";
import BusinessProductInOrder from "../../../../Models/BusinessProductInOrder";

const ROUTE = "/user/orders";

export default Router({ mergeParams: true }).post(
  ROUTE,
  isPerson,
  async (req, res) => {
    const { productsPrice, shippingPrice } = req.body;
    const cartProds = await req
      .person!.$get("cartProducts")
      .then((resp) => JSON.parse(JSON.stringify(resp)));
    const newOrder = await Order.create({
      userId: req.person!.id,
      productsPrice,
      shippingPrice
    });

    await newOrder.$create("shipping", { state: "preparing" });
    cartProds.forEach(async (product: any) => {
      await ProductInOrder.create({
        productId: product!.id,
        orderId: newOrder!.id,
        //@ts-ignore
        price: product.price,
        //@ts-ignore
        amount: product.ProductInCart.amount
      });
    });

    const prods: any = {};

    cartProds.forEach((prod: any) => {
      if (prods[prod.businessId]) prods[prod.businessId].push(prod);
      else prods[prod.businessId] = [prod];
    });

    for (const [businessId, productsArr] of Object.entries(prods)) {
      const newBusinessOrder = await BusinessOrder.create({
        businessId,
        state: "preparing"
      });
      (productsArr as any[]).forEach(async (prod) => {
        await BusinessProductInOrder.create({
          productId: prod!.id,
          businessOrderId: newBusinessOrder!.id,
          price: prod.price,
          amount: prod.ProductInCart.amount
        });
      });
    }
    await req.person!.$set("cartProducts", []);
    res.sendStatus(200);
  }
);

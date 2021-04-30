import express from "express";
import Order from "../Models/Order";
import ProductInCart from "../Models/ProductInCart";
const router = express.Router();

router.put("/product", async (req, res) => {
  const { userId, productId } = req.body;
  const order = await Order.findOne({ where: { userId } });
  await ProductInCart.create({
    amount: 1,
    price: 1,
    orderId: order!.id,
    productId
  });
  res.sendStatus(200);
});

export default router;

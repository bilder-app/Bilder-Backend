import express from "express";
import Order from "../Models/Order";
import ProductInCart from "../Models/ProductInCart";
import ProductInCart from "../Models/ProductInCart";
import isBusiness from "../Api/middleware/isBusiness";

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

router.get("/orders", isBusiness, async (req, res) => {
  res.json(
    await req.business!.$get("orders", {
      include: [{ model: ProductInCart }]
    })
  );
})

export default router;

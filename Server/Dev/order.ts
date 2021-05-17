import express from "express";
import Order from "../Models/Order";
import Product from "../Models/Product";
import ProductInCart from "../Models/ProductInCart";
import ProductInOrder from "../Models/ProductInOrder";
import isBusiness from "../Api/middleware/isBusiness";


const router = express.Router();

// Add a new order with userId = 1
router.post("/", async (req, res) => {
  await Order.create({
    userId: req.body.userId,
    state: "completed"
  });
  res.sendStatus(200)
})

// Add product to Order
router.post("/product", async (req, res) => {
  const { userId, productId } = req.body;
  const order = await Order.findOne({ where: { userId } });
  await ProductInOrder.create({
    amount: 10,
    price: 375,
    orderId: order!.id,
    productId
  });
  res.sendStatus(200);
});


// Get orders by businessId 
router.get("/", async (req, res) => {
  const { businessId } = req.body // --> req.business.id

  const myProducts = await Product.findAll({
    where: { businessId: businessId }
  })
  const promisesArr = myProducts.map(async ({ id }) => {
    return await ProductInOrder.findOne({
      where: { productId: id }
    })
  })

  setTimeout(() => {
    async function orders() {
      try {
        res.json(await Promise.all(promisesArr))
      } catch(error) {
        console.log('error:', error);
      }
    }
    orders()
  }, 1000)
})




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

import express from "express";
const router = express.Router();
import personRouter from "./person";
import productRouter from "./product";
import orderRouter from "./order";
import bcrypt from "bcryptjs";
import User from "../Models/User";
import Business from "../Models/Business";
import { businesses } from "./Seed/Products";

router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/person", personRouter);

router.get("/seed", async (req, res) => {
  businesses.forEach(
    async ({
      business: { products, password, email, ...businessData }
    }: any) => {
      const hashedPassword = await bcrypt.hash(password + "", 10);
      const newUser = await User.create({
        password: hashedPassword,
        email
      });
      const business = await Business.create(businessData);
      await newUser.$set("business", business);

      for (const productData of products) {
        await business.$create("product", productData);
      }
    }
  );
  res.sendStatus(200);
});

export default router;

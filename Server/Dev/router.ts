import express from "express";
const router = express.Router();
import personRouter from "./person";
import productRouter from "./product";
import orderRouter from "./order";
import bcrypt from "bcryptjs";
import User from "../Models/User";
import Business from "../Models/Business";

router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/person", personRouter);

const products = [
  {
    name: "Martillo",
    description: "un martillo",
    price: 150,
    stock: 50,
    content: 5,
    contentType: "Kilo (k)",
    model: "Modelo",
    brand: "Brand",
    images: ["https://picsum.photos/id/237/1000/1000"]
  }
];

router.get("/seed", async (req, res) => {
  const hashedPassword = await bcrypt.hash("test1", 10);
  const newUser = await User.create({
    password: hashedPassword,
    email: "test1@test1.com"
  });
  const business = await Business.create({
    name: "john",
    surname: "Doe",
    cuit: "123124",
    sector: "Ferreteria",
    address: "123123",
    contact: "123asd",
    nameBusiness: "El ferretero"
  });
  await newUser.$set("business", business);

  for (const productData of products) {
    await business.$create("product", productData);
  }

  res.sendStatus(200);
});

export default router;

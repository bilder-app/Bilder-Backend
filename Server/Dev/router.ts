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

const businesses = [
  {
    password: "1231453535",
    email: "a",
    name: "asd",
    surname: "asd",
    cuit: 123456,
    sector: "Ferreteria",
    address: 123,
    takeAway: false,
    delivery: true,
    deliveryPrice: 1000,
    freeDeliveryAt: 1000,
    contact: 123,
    nameBusiness: "El ferretero",
    products: [
      {
        name: "Martillo",
        description: "un martillo",
        price: 75,
        stock: 50,
        content: 5,
        contentType: "Kilo (k)",
        model: "Modelo",
        brand: "Brand",
        images: ["https://picsum.photos/id/236/1000/1000"]
      },
      {
        name: "Pala",
        description: "una pala",
        price: 150,
        stock: 50,
        content: 5,
        contentType: "Kilo (k)",
        model: "Modelo",
        brand: "Brand",
        images: ["https://picsum.photos/id/231/1000/1000"]
      },
      {
        name: "Cemento",
        description: "es cemento",
        price: 12,
        stock: 30,
        content: 5,
        contentType: "Kilo (k)",
        model: "Modelo",
        brand: "Brand",
        images: ["https://picsum.photos/id/227/1000/1000"]
      }
    ]
  },
  {
    password: "1231453535",
    email: "ab",
    name: "asd",
    surname: "asd",
    cuit: 123456,
    sector: "Ferreteria",
    address: 123,
    takeAway: false,
    delivery: false,
    contact: 123,
    nameBusiness: "Las palas",
    products: [
      {
        name: "Pintura",
        description: "Latex",
        price: 99,
        stock: 50,
        content: 5,
        contentType: "Kilo (k)",
        model: "Modelo",
        brand: "Brand",
        images: ["https://picsum.photos/id/537/1000/1000"]
      },
      {
        name: "Plasticola",
        description: "plasticola",
        price: 20,
        stock: 45,
        content: 5,
        contentType: "Kilo (k)",
        model: "Modelo",
        brand: "Brand",
        images: ["https://picsum.photos/id/437/1000/1000"]
      },
      {
        name: "Pollo",
        description: "o gallina",
        price: 78,
        stock: 50,
        content: 5,
        contentType: "Kilo (k)",
        model: "Modelo",
        brand: "Brand",
        images: ["https://picsum.photos/id/289/1000/1000"]
      }
    ]
  },
  {
    password: "1231453535",
    email: "abc",
    name: "asd",
    surname: "asd",
    cuit: 123456,
    sector: "Ferreteria",
    address: 123,
    takeAway: true,
    delivery: true,
    deliveryPrice: 500,
    freeDeliveryAt: 500,
    contact: 123,
    nameBusiness: "Doctor amigo",
    products: [
      {
        name: "Sarten",
        description: "una sarten",
        price: 25,
        stock: 50,
        content: 5,
        contentType: "Kilo (k)",
        model: "Modelo",
        brand: "Brand",
        images: ["https://picsum.photos/id/127/1000/1000"]
      },
      {
        name: "Olla de hierro",
        description: "una olla",
        price: 999,
        stock: 50,
        content: 5,
        contentType: "Kilo (k)",
        model: "Modelo",
        brand: "Brand",
        images: ["https://picsum.photos/id/237/1000/1000"]
      }
    ]
  }
];

router.get("/seed", async (req, res) => {
  businesses.forEach(async ({ products, password, email, ...businessData }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      password: hashedPassword,
      email
    });
    const business = await Business.create(businessData);
    await newUser.$set("business", business);

    for (const productData of products) {
      await business.$create("product", productData);
    }
  });
  res.sendStatus(200);
});

export default router;

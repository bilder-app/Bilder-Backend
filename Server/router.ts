import express from "express";
const router = express.Router();
import orderRouter from "./Api/Routes/order";
import productRouter from "./Api/Routes/product";
import favoriteRouter from "./Api/Routes/favorite";
import categoryRouter from "./Api/Routes/category";
import devRouter from "./Dev/router";

router.use("/cart", orderRouter);
router.use("/category", categoryRouter);
router.use("/favorite", favoriteRouter);
router.use("/dev", devRouter);
router.use("/product", productRouter);

export default router;

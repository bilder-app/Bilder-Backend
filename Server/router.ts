import express from "express";
const router = express.Router();
import orderRouter from "./Api/Routes/order";
import productRouter from "./Api/Routes/product";
import devRouter from "./Dev/router";

router.use("/cart", orderRouter);
router.use("/dev", devRouter);
router.use("/product", productRouter);

export default router;

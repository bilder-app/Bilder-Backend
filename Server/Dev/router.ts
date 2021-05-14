import express from "express";
const router = express.Router();
import personRouter from "./person";
import productRouter from "./product";
import orderRouter from "./order";

router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/person", personRouter);

export default router;

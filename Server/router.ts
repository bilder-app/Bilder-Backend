import express from "express";
const router = express.Router();
import productRouter from "./Api/Routes/product";
import devRouter from "./Dev/router";

router.use("/dev", devRouter);
router.use("/product", productRouter);

export default router;

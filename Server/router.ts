import express from "express";
const router = express.Router();
import devRouter from "./Dev/router";

router.use("/dev", devRouter);

export default router;

import express from "express";
const router = express.Router();
import {
  removeProductFromOrder,
  addProductToCart,
  getAllCartProducts,
  clearAllCartProducts,
} from "../Controllers/orderController";

router.get("/", (req, res) =>
  getAllCartProducts().then((resp) => res.json(resp))
);

router.put("/clear/", (req, res) =>
  clearAllCartProducts().then(() => res.json())
);

router.put("/product/:productId", async (req, res) =>
  addProductToCart(+req.params.productId, req.body.amount).then((resp) =>
    res.sendStatus(200)
  )
);

router.delete("/product/:productId", (req, res) =>
  removeProductFromOrder(+req.params.productId).then((resp) =>
    res.sendStatus(200)
  )
);

router.get("/amount", (req, res) =>
  getAllCartProducts().then((resp) => {
    const cantidad = resp.map((item) => item.amount);
    var total = cantidad.reduce(function (a, b) {
      return a + b;
    });
    res.json(total);
  })
);

export default router;

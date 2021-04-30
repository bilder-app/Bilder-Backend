import express from "express";
const router = express.Router();
import {
  getAllUsersFavoriteProducts,
  addProductToUsersFavorite,
  removeProductFromUsersFavorite
} from "../Controllers/favoriteController";

router.get("/", (req, res) =>
  getAllUsersFavoriteProducts().then((resp) => res.json(resp))
);

router.post("/:productId", async (req, res) =>
  addProductToUsersFavorite(+req.params.productId).then(() =>
    res.sendStatus(200)
  )
);

router.delete("/:productId", (req, res) =>
  removeProductFromUsersFavorite(+req.params.productId).then(() =>
    res.sendStatus(200)
  )
);

export default router;

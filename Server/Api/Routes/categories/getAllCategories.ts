import Category from "../../../Models/Category";
import { Router } from "express";

const ROUTE = "/categories";

export default Router({ mergeParams: true }).get(ROUTE, (req, res) => {
  Category.findAll()
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => res.status(400).json(err));
});

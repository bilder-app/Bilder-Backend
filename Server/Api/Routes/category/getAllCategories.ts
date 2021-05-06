import Category from "../../../Models/Category";
import { Router } from "express";

const ROUTE = "/categories";

export default Router({ mergeParams: true }).get(ROUTE, (req, res) => {
  res.json(Category.findAll());
});

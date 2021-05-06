import { Router } from "express";
import Person from "../../../../../Models/Person";

const ROUTE = "/user/cart/amount";

export default Router({ mergeParams: true }).delete(ROUTE, async (req, res) => {
  const person = await Person.findByPk(req.user!.id);
  const products = await person?.$get("cartProducts");
  if (!products) return res.status(200).send(0);
  const total = products.map((item) => item.amount).reduce((a, b) => a + b);
  res.status(200).send(total);
});

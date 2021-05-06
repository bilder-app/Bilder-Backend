import { Router } from "express";
import Person from "../../../../../Models/Person";

const ROUTE = "/user/cart/:productId";

export default Router({ mergeParams: true }).delete(ROUTE, async (req, res) => {
  const { productId } = req.params;
  const person = await Person.findByPk(req.user!.id);
  res.json(person!.$remove("cartProducts", productId));
});

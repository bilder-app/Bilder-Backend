import { Router } from "express";
import Person from "../../../../Models/Person";

const ROUTE = "/user/cart";

export default Router({ mergeParams: true }).get(ROUTE, async (req, res) => {
  const person = await Person.findByPk(req.user!.id);
  res.json(person!.$get("cartProducts"));
});

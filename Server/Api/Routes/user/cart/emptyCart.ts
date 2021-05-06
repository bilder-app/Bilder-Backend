import { Router } from "express";
import Person from "../../../../Models/Person";

const ROUTE = "/user/cart";

export default Router({ mergeParams: true }).delete(ROUTE, async (req, res) => {
  const person = await Person.findByPk(req.user!.id);
  await person!.$set("cartProducts", []);
  res.sendStatus(200);
});

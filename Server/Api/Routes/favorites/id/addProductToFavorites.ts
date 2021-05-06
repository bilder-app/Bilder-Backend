import Person from "../../../../Models/Person";
import { Router } from "express";

const ROUTE = "/favorites/:productId";

export default Router({ mergeParams: true }).post(ROUTE, async (req, res) => {
  const { productId } = req.params;
  const user = await Person.findByPk(req.user?.id);

  await user?.$add("favorite", productId);
  res.sendStatus(200);
});

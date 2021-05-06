import Person from "../../../../Models/Person";
import { Router } from "express";

const ROUTE = "/favorites/:productId";

export default Router({ mergeParams: true }).get(ROUTE, async (req, res) => {
  const { productId } = req.params;
  const user = await Person.findByPk(req.user?.id);

  await user?.$set(
    "favorites",
    (await user?.$get("favorites")!).filter((prod) => prod.id !== productId)
  );
  res.sendStatus(200);
});

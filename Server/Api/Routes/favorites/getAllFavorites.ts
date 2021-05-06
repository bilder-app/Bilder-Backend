import Person from "../../../Models/Person";
import { Router } from "express";

const ROUTE = "/favorites";

export default Router({ mergeParams: true }).get(ROUTE, async (req, res) => {
  const user = await Person.findByPk(req.user?.id);

  res.json(
    await user?.$get("favorites", {
      //@ts-ignore
      joinTableAttributes: []
    })
  );
});

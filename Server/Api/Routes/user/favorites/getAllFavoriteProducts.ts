import { Router } from "express";
import isPerson from "../../../middleware/isPerson";

const ROUTE = "/user/favorites";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isPerson,
  async (req, res) =>
    res.json(
      await req.person!.$get(
        "favorites",
        //@ts-ignore
        { joinTableAttributes: [] }
      )
    )
);

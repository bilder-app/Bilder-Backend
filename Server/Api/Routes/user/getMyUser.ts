import { Router } from "express";
import isPerson from "../../middleware/isPerson";

const ROUTE = "/user/me";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isPerson,
  (req, res) => {
    const user = req.user;
    return res.json(user);
  }
);

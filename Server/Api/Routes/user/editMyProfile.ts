import { Router } from "express";
import isPerson from "../../middleware/isPerson";

const ROUTE = "/user/me";

export default Router({ mergeParams: true }).put(
  ROUTE,
  isPerson,
  async (req, res) => {
    const user = req.person!;
    const updateProfile = await user.update(req.body, { returning: true });
    res.json(updateProfile);
  }
);

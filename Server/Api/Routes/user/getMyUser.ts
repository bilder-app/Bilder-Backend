import { Router } from "express";
import isPerson from "../../middleware/isPerson";
import User from "../../../Models/User";

const ROUTE = "/user/me";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isPerson,
  (req, res) => {
    const user = req.user!.toJSON();
    //@ts-ignore
    delete user.password;
    res.json({ ...req.person!.toJSON(), ...user });
  }
);

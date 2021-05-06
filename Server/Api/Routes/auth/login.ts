import { Router } from "express";
import passport from "passport";
import User from "../../../Models/User";

const ROUTE = "/auth/login";

export default Router({ mergeParams: true }).post(ROUTE, (req, res, next) =>
  passport.authenticate("local", function (err: Error, user: User) {
    if (err) return res.sendStatus(500);
    if (!user) return res.sendStatus(404);

    req.login(user, function (err) {
      if (err) return res.sendStatus(500);
      return res.sendStatus(200);
    });
  })(req, res, next)
);

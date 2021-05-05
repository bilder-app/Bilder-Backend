import { Router } from "express";

const ROUTE = "/auth/is-logged-in";

export default Router({ mergeParams: true }).get(ROUTE, (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ userName: req.user!.email });
  } else res.sendStatus(401);
});

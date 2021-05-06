import { Router } from "express";

const ROUTE = "/auth/logout";

export default Router({ mergeParams: true }).post(ROUTE, (req, res) => {
  req.logOut();
  res.clearCookie("connect.sid");
  res.sendStatus(200);
});

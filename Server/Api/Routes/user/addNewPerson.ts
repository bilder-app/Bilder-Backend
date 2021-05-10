import User from "../../../Models/User";
import { Router } from "express";
import bcrypt from "bcryptjs";

const ROUTE = "/user";

export default Router({ mergeParams: true }).post(ROUTE, async (req, res) => {
  const { password, email, ...personData } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ password: hashedPassword, email });
  await newUser.$create("person", personData);
  res.sendStatus(200);
});

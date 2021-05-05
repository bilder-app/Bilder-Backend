import { Router } from "express";
import User from "../../../Models/User";
import bcrypt from "bcryptjs";

const ROUTE = "/auth/register";

export default Router({ mergeParams: true }).post(ROUTE, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json("You need to provide both a 'userName' and 'password'");

  const user = await User.findOne({ where: { email } });
  if (user) return res.status(409).json("User already exists");
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    res.json(newUser.email);
  } catch (e) {
    res.sendStatus(500);
  }
});

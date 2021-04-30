import express from "express";
const router = express.Router();
import User from "../Models/User";
import Person from "../Models/Person";
import Order from "../Models/Order";

// console.log(Object.keys(Object.getPrototypeOf(MODEL)));

router.post("/", async (req, res) => {
  const newUser = await User.create(req.body, {
    fields: ["email", "password"]
  });
  const newPerson = await Person.create({ name: "name", lastname: "lastName" });
  await newUser.$set("person", newPerson);
  const newOrder = await Order.create({ state: "pending" });
  await newPerson.$add("order", newOrder);
  return res.sendStatus(200);
});

export default router;

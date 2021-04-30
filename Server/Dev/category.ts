import express from "express";
const router = express.Router();
import Category from "../Models/Category";
import faker from "faker";

router.post("/:amount", async (req, res) => {
  const { amount } = req.params;
  const categories: any = [];
  for (let i = 0; i < +amount; i++) {
    categories.push({
      name: faker.random.word() + " " + faker.random.uuid().substr(0, 4)
    });
  }

  await Category.bulkCreate(categories);
  res.sendStatus(200);
});

router.post("/", function (req, res) {
  const { name } = req.body;
  Category.findOrCreate({
    where: {
      name: name
    }
  })
    .then((resp) => res.send(resp))
    .catch((err) => res.status(400).json(err));
});

export default router;

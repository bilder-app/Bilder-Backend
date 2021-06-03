import Category from "../../../Models/Category";
import { Router } from "express";

const ROUTE = "/categories";

export default Router({ mergeParams: true }).post(ROUTE, (req, res) => {
  const { name } = req.body;
  Category.findOrCreate({
    where: {
      name: name,
    },
  })
    .then((resp) => {
      console.log(resp);
      res.send(resp);
    })
    .catch((err) => res.status(400).json(err));
});

// router.get("/category", function (req, res) {
//   Category.findAll()
//     .then((resp) => {
//       console.log(resp);
//       res.send(resp);
//     })
//     .catch((err) => res.status(400).json(err));
// });

// router.post("/category", function (req, res) {
//   const { name } = req.body;
//   Category.findOrCreate({
//     where: {
//       name: name,
//     },
//   })
//     .then((resp) => {
//       console.log(resp);
//       res.send(resp);
//     })
//     .catch((err) => res.status(400).json(err));
// });
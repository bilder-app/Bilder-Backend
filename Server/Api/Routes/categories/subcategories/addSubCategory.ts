import { Router } from "express";
import Category from "../../../../Models/Category";

const ROUTE = "/categories/subcategory/";

export default Router({ mergeParams: true }).post(ROUTE, (req, res) => {
  const { categoryName, subcategoryName } = req.body;
  Category.findByPk(categoryName)
    .then((response) => {
      response
        ?.$create("subcategory", { name: subcategoryName })
        .then((resp) => {
          console.log(resp);
          res.json(resp);
        });
    })
    .catch((err) => res.status(400).json(err));
});

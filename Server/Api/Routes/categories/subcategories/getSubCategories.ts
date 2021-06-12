import { Router } from "express";
import SubCategory from "../../../../Models/SubCategory";

const ROUTE = "/categories/subcategory/:categoryName";

export default Router({ mergeParams: true }).get(ROUTE, (req, res) => {
  const { categoryName } = req.params;
  SubCategory.findAll({
    where: {
      categoryName: categoryName
    }
  })
  .then((resp) => {
    res.send(resp);
  })
  .catch((err) => res.status(400).json(err));
});

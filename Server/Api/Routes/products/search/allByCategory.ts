import { Router } from "express";
import Product from "../../../../Models/Product";

const ROUTE = "/products/search/category/:categoryName";  // ej: categoryName: "Electricidad"

export default Router({ mergeParams: true }).get(
  ROUTE, 
  (req, res) => {
    const { categoryName } = req.params;

    Product.findAll({
        where: {
          categoryName: categoryName
      }
    })
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => res.status(400).json(err));
  }
);

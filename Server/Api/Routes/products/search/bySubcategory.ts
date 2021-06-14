import { Router } from "express";
import Product from "../../../../Models/Product";
import ProductSubCategory from "../../../../Models/ProductSubCategory";

const ROUTE = "/products/search/subcategory/:subcategoryName";  // ej: subcategoryName: "Sonido"

export default Router({ mergeParams: true }).get(ROUTE, (req, res) => {
  const { subcategoryName } = req.params;
  
  ProductSubCategory.findAll({
    where: {
      subcategory: subcategoryName
    }
  })
  .then((arr) => {
    return Promise.all(
      arr.map(({ productId }) => Product.findByPk(productId))
    )
  })
  .then((data) => res.json(data))
  .catch((err) => res.status(400).json(err));
});

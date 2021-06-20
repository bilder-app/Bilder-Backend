import { Router } from "express";
import SubCategory from "../../../../Models/SubCategory";
import ProductSubCategory from "../../../../Models/ProductSubCategory";

const ROUTE = "/categories/:productId";

export default Router({ mergeParams: true }).get(ROUTE, async (req, res) => {
  const { productId } = req.params;

  const resp = await ProductSubCategory.findOne({
    where: { productId: productId },
  });
  if (!!resp) {
    res.json(await SubCategory.findByPk(resp.subcategory));
  } else {
    res.status(404).send({ message: "No hay categorias disponibles" });
  }
});

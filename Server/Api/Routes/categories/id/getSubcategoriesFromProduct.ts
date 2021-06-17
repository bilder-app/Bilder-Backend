import { Router } from "express";
import SubCategory from "../../../../Models/SubCategory";
import ProductSubCategory from "../../../../Models/ProductSubCategory";

const ROUTE = "/categories/:productId";

export default Router({ mergeParams: true }).get(
  ROUTE, 
  async (req, res) => {
  const { productId } = req.params;
  
  try {
    const resp = await ProductSubCategory.findOne({
      where: { productId: productId }
    })
    res.json( await SubCategory.findByPk(resp.subcategory) )
  }
  catch {
    res.status(404).send({ message: "No hay categorias disponibles" })
  }


});

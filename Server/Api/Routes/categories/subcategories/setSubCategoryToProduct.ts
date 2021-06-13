import { Router } from "express";
import Product from "../../../../Models/Product";
import ProductSubCategory from "../../../../Models/ProductSubCategory";

const ROUTE = "/categories/subcategory/:productId";

export default Router({ mergeParams: true }).put(
  ROUTE, 
  async (req, res) => {
  const { name } = req.body;
  const { productId } = req.params;
  

  // const product = await Product.findByPk(productId) 

  //   if (!product) return res.sendStatus(404);
  //   const updatedProduct = await product.update({ categoryName: name }, { returning: true });
  //   res.json(updatedProduct);

  res.json(
    await ProductSubCategory.findOrCreate({
      where: { productId: productId },
      defaults: { subcategory: name }
    })
  )
});

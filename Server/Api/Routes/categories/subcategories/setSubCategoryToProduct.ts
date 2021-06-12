import { Router } from "express";
import Product from "../../../../Models/Product";

const ROUTE = "/categories/subcategory/:productId";

export default Router({ mergeParams: true }).put(
  ROUTE, 
  async (req, res) => {
  const { name } = req.body;
  const { productId } = req.params;
  
    const product = await Product.findByPk(productId) 

    if (!product) return res.sendStatus(404);
    product.categoryName = name;
    const updatedProduct = await product.update(product, { returning: true });
    res.json(updatedProduct);
});

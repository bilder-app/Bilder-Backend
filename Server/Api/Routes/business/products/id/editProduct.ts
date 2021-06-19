import { Router } from "express";
import isBusiness from "../../../../middleware/isBusiness";
import ProductSubCategory from "../../../../../Models/ProductSubCategory";

const ROUTE = "/business/products/:productId";

export default Router({ mergeParams: true }).put(
  ROUTE,
  isBusiness,
  async (req, res) => {
    const { productId } = req.params;
    const { subcategories } = req.body;
    const [product] = await req.business!.$get("products", {
      where: { id: productId }
    });
    if (!product) return res.sendStatus(404);
    
    const [ response, created ] = await ProductSubCategory.findOrCreate({
      where: { productId: product.id },
      defaults: { subcategory: subcategories }
    })
    if(!created) {
      await ProductSubCategory.update(
        { subcategory: subcategories },
        {
          where: { productId: product.id }
        }
      )
    }

    await product.update(req.body, { returning: true });
    res.json(200);
  }
);

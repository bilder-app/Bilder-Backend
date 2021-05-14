import { Router } from "express";
import Product from "../../../../Models/Product";
import ProductInOrder from "../../../../Models/ProductInOrder";
import isBusiness from "../../../middleware/isBusiness";

const ROUTE = "/business/orders/";

// Get orders by businessId 
export default Router({ mergeParams: true }).get(
  ROUTE,
  isBusiness,
  async (req, res) => {
    const myProducts = await Product.findAll({
      where: { businessId:  req.business.id }
    })
    
    const promisesArr = myProducts.map(async ({ id }) => {
      return await ProductInOrder.findOne({
        where: { productId: id }
      })
    })

    setTimeout(() => {
      async function orders() {
        try {
          res.json(await Promise.all(promisesArr))
        } catch(error) {
          console.log('error:', error);
        }
      }
      orders()
    }, 1000)
  }
);

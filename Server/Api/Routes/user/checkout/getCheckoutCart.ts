import { Router } from "express";
import isPerson from "../../../middleware/isPerson";
import Business from "../../../../Models/Business";
import { remap } from "../../../../ramdaHelperFns";

const ROUTE = "/user/checkout/cart";

export default Router({ mergeParams: true }).get(
  ROUTE,
  isPerson,
  async (req, res) => {
    const products: any = await req
      .person!.$get("cartProducts", {
        attributes: ["id", "name", "price", "images"],
        //@ts-ignore
        joinTableAttributes: ["amount"],
        include: [
          {
            model: Business,
            attributes: [
              "id",
              "takeAway",
              "delivery",
              "deliveryPrice",
              "freeDeliveryAt",
              "address"
            ]
          }
        ]
      })
      // @ts-ignore
      .then((resp) => JSON.parse(JSON.stringify(resp)));

    const productsByBusinessId: any = {};

    products.forEach((product: any) => {
      const productData = remap(
        {
          id: ["id"],
          name: ["name"],
          price: ["price"],
          image: ["images", 0],
          businessData: ["business"],
          units: ["ProductInCart", "amount"]
        },
        product
      );

      if (!productsByBusinessId[product.business.id])
        productsByBusinessId[product.business.id] = [productData];
      else productsByBusinessId[product.business.id].push(productData);
    });

    const response: any = [];
    let packageNumber = 1;
    Object.values(productsByBusinessId).forEach((products: any) => {
      const business = products[0].businessData;
      products.map((product: any) => {
        delete product.businessData;
        return product;
      });
      response.push({ packageNumber, business, products });
      packageNumber++;
    });

    res.json(response);
  }
);

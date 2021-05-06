import Product from "../../../Models/Product";
import { Router } from "express";

const ROUTE = "/products";

export default Router({ mergeParams: true }).post(ROUTE, (req, res) => {
  const { name, description, price, stock } = req.body;

  res.json(
    Product.findOrCreate({
      where: {
        name,
        description,
        price,
        stock: stock,
        images: [
          "https://images.app.goo.gl/RcgLkEbTz1aRegpeA",
          "https://images.app.goo.gl/oXwgPP32RdmAkd6T7"
        ]
      }
    })
  );
});

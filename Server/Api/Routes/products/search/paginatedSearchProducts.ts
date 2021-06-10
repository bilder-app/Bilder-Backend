import Product from "../../../../Models/Product";
import { Router } from "express";
import { Op } from "sequelize";

const ROUTE = "/products/search";

export default Router({ mergeParams: true }).get(ROUTE, async (req, res) => {
  const { name, limit: limitStr, page: pageStr } = req.query;
  if (!limitStr || !pageStr) return res.sendStatus(400);
  const limit = parseInt(limitStr as string);
  const page = parseInt(pageStr as string);

  const productsAmount = await Product.count({
    where: { name: { [Op.iLike]: `%${name}%` } }
  });

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let next: undefined | object = undefined;
  let previous: undefined | object = undefined;

  if (endIndex < productsAmount) {
    next = {
      page: page + 1,
      limit: limit
    };
  }

  if (startIndex > 0 && startIndex < productsAmount) {
    previous = {
      page: page - 1,
      limit: limit
    };
  }

  const products = await Product.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` }
    },
    order: [["name", "ASC"]],
    limit,
    offset: Math.max(0, startIndex)
  });

  res.json({
    total: productsAmount,
    next,
    previous,
    results: products
  });
});

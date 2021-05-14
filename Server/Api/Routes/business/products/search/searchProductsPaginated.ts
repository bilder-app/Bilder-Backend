import isBusiness from "../../../../middleware/isBusiness";
import { Router } from "express";
import Product from "../../../../../Models/Product";
import Category from "../../../../../Models/Category";
import { Op } from "sequelize";

const ROUTE = "/business/products/search";

interface paginatedResponse {
  next:
    | {
        page: number;
        limit: number;
      }
    | {};
  previous:
    | {
        page: number;
        limit: number;
      }
    | {};
  data: Product[];
  totalProducts: number;
}

export default Router({ mergeParams: true }).get(
  ROUTE,
  isBusiness,
  async (req, res) => {
    const {
      page: pageS,
      limit: limitS,
      query
    } = req.query as unknown as {
      page: number;
      limit: number;
      query: string;
    };

    const page = +pageS;
    const limit = +limitS;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const productsCount = await req.business!.$count("products", {
      where: { name: { [Op.iLike]: `%${query}%` } }
    });

    const results: paginatedResponse = {
      next: {},
      previous: {},
      data: [],
      totalProducts: productsCount
    };

    if (endIndex < productsCount) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0 && startIndex < productsCount) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }

    results.data = await req.business!.$get("products", {
      offset: startIndex,
      limit,
      include: [{ model: Category, through: { attributes: [] } }],
      where: { name: { [Op.iLike]: `%${query}%` } }
    });

    res.json(results);
  }
);

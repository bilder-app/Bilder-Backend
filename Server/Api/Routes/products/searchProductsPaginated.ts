// import Product from "../../../Models/Product";
// import { Router } from "express";
// import { Op } from "sequelize";

// const ROUTE = "/products";

// export default Router({ mergeParams: true }).get(ROUTE, async (req, res) => {
//   const { name, page, limit = 5 } = (req.query as unknown) as {
//     name: string;
//     page: number;
//     limit: number;
//   };

//   const productsAmount = await Product.count({
//     where: { name: { [Op.iLike]: `%${name}%` } }
//   });

//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;

//   let next: undefined | object = undefined;
//   let previous: undefined | object = undefined;

//   if (startIndex > 0) {
//     previous = {
//       page: page - 1,
//       limit
//     };
//   }

//   if (endIndex < productsAmount) {
//     next = {
//       page: page + 1,
//       limit
//     };
//   }

//   const totalPaginationPages =
//     productsAmount % limit === 0
//       ? productsAmount / limit
//       : ~~(productsAmount / limit) + 1;

//   res.json(
//     Product.findAndCountAll({
//       where: {
//         name: { [Op.iLike]: `%${name}%` }
//       },
//       order: [["name", "ASC"]],
//       limit,
//       offset: Math.max(0, startIndex)
//     }).then((resp) => ({
//       totalProducts: productsAmount,
//       totalPaginationPages,
//       next,
//       previous,
//       products: resp.rows
//     }))
//   );
// });

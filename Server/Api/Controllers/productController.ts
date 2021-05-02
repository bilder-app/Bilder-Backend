import { Op } from "sequelize";
import Category from "../../Models/Category";
import Product from "../../Models/Product";
import { removeDiacritics } from "../../utils";

export async function getAllProducts() {
  return Product.findAll({
    include: [{ model: Category, through: { attributes: [] } }]
  });
}

export async function getProduct(id: any) {
  return Product.findOne({ where: { id } });
}

export async function addProduct({
  name,
  description,
  price,
  stock
}: {
  name: string;
  description: string;
  price: number;
  stock: number;
}) {
  return Product.findOrCreate({
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
  });
}

export async function paginatedSearchProducts({
  name,
  page,
  limit = 5
}: {
  name: string;
  page: number;
  limit?: number;
}) {
  const productsAmount = await Product.count({
    where: { name: { [Op.iLike]: `%${name}%` } }
  });

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let next: undefined | object = undefined;
  let previous: undefined | object = undefined;

  if (startIndex > 0) {
    previous = {
      page: page - 1,
      limit
    };
  }

  if (endIndex < productsAmount) {
    next = {
      page: page + 1,
      limit
    };
  }

  const totalPaginationPages =
    productsAmount % limit === 0
      ? productsAmount / limit
      : ~~(productsAmount / limit) + 1;

  return Product.findAndCountAll({
    where: {
      name: { [Op.iLike]: `%${name}%` }
    },
    order: [["name", "ASC"]],
    limit,
    offset: Math.max(0, startIndex)
  }).then((resp) => ({
    totalProducts: productsAmount,
    totalPaginationPages,
    next,
    previous,
    products: resp.rows
  }));
}

export async function searchByCategories(categories: string[]) {
  categories = categories.map((cat) => removeDiacritics(cat));
  return Product.findAll({
    where: {
      "$categories.name$": {
        [Op.or]: categories.map((cat) => ({ [Op.iLike]: cat }))
      }
    },
    include: [
      {
        model: Category,
        through: { attributes: [] },
        attributes: [],
        as: "categories"
      }
    ]
  }).then(
    async (prods) =>
      await Promise.all(
        prods.map(async (prod) => {
          const newProdData: any = { ...prod.toJSON() };
          const categories: any = await prod.$get("categories");
          return { ...newProdData, categories };
        })
      )
  );
}

import Order from "../../Models/Order";
import Product from "../../Models/Product";
import ProductInCart from "../../Models/ProductInCart";

//temporary
const userId = 1;

export async function getAllCartProducts() {
  return Order.findOne({
    where: { userId: userId, state: "pending" },
    include: [
      {
        model: Product,
        attributes: { exclude: ["createdAt", "updatedAt", "price"] },
        through: { attributes: ["amount", "price"] }
      }
    ]
  }).then((resp) => {
    if (!resp) return [];
    return resp.products.map((prod: any) => {
      prod = prod.toJSON();
      prod = { ...prod, ...prod.ProductInCart };
      delete prod.ProductInCart;
      return prod;
    });
  });
}

export async function removeProductFromOrder(productId: number) {
  const order = await Order.findOne({
    where: { state: "pending", userId },
    include: [{ model: Product, through: { attributes: [] } }]
  });
  return order?.$remove("product", productId);
}

export async function addProductToCart(productId: number, amount: number) {
  const order = (await Order.findOne({
    where: { userId: userId, state: "pending" }
  })) as Order; // TODO fix this
  const product = (await Product.findByPk(productId)) as Product; // TODO fix this

  const [productInCart, wasJustCreated] = await ProductInCart.findOrCreate({
    where: { orderId: order.id, productId },
    defaults: {
      amount,
      price: product.price
    }
  });

  if (wasJustCreated) return;

  productInCart.amount = amount;
  productInCart.price = product.price;
  return await productInCart.save();
}

export async function clearAllCartProducts() {
  return Order.findOne({
    where: { userId: userId, state: "pending" }
  }).then((resp) => {
    if (!resp) return;
    else return resp.$set("products", []);
  });
}

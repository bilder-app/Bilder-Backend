import { curry, view, lensPath, map } from "ramda";

/**
 * Creates a new object by picking
 * nested properties of another object
 *
 * @example
 * const product = {
 *          id: 1,
 *          businessId: 2,
 *          categoryName: null,
 *          name: "Producto 3",
 *          description: "asd",
 *          price: 150,
 *          stock: 150,
 *          content: null,
 *          contentType: "Kilo (k)",
 *          model: null,
 *          brand: null,
 *          images: [
 *              "http://source.unsplash.com/random"
 *          ],
 *          createdAt: "2021-06-10T19:29:56.143Z",
 *          updatedAt: "2021-06-10T19:29:56.143Z",
 *          ProductInCart: {
 *              productId: 1,
 *              personId: 3,
 *              amount: 8,
 *              createdAt: "2021-06-11T13:42:07.795Z",
 *              updatedAt: "2021-06-11T18:16:55.020Z"
 *          }
 *      },
 *
 * const newProduct = remap({
 *      name: ["name"],
 *      price: ["price"],
 *      image: ["images", 0],
 *      units: ["ProductInCart", "amount"]
 *    })
 *
 * // returns
 *  newProduct == {
 *      name: "Producto 3",
 *      price: 150,
 *      image: "http://source.unsplash.com/random"
 *      units: 8
 *  }
 *
 */
export const remap = curry((desc: object, obj: object) =>
  map((path: string[]) => view(lensPath(path), obj), desc)
);

import Person from "../../Models/Person";
import User from "../../Models/User";

//temporary
const userId = 1;

export async function getAllUsersFavoriteProducts() {
  //TODO: User middleware
  const user = await Person.findOne({ where: { userId: userId } });

  return await user?.$get("favorites", {
    //@ts-ignore
    joinTableAttributes: []
  });
}

export async function addProductToUsersFavorite(productId: number) {
  //TODO: User middleware
  const user = await Person.findOne({ where: { userId: userId } });

  return await user?.$add("favorite", productId);
}

export async function removeProductFromUsersFavorite(productId: number) {
  //TODO: User middleware
  const user = await Person.findOne({ where: { userId: userId } });

  return await user?.$set(
    "favorites",
    (await user?.$get("favorites")!).filter((prod) => prod.id !== productId)
  );
}

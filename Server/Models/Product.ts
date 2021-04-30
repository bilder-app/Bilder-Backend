import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsToMany,
  BelongsTo,
  HasMany
} from "sequelize-typescript";
import Business from "./Business";
import Category from "./Category";
import Order from "./Order";
import ProductInCart from "./ProductInCart";
import ProductCategory from "./ProductCategory";
import Person from "./Person";
import FavouriteProduct from "./FavouriteProduct";
import Offer from "./Offer";

@Table
export default class Product extends Model {
  @ForeignKey(() => Business)
  @Column
  businessId: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false, type: DataType.STRING(20) })
  shortDescription: string;

  @Column({ allowNull: false })
  price: number;

  @Column({ allowNull: false })
  stock: number;

  @Column({ allowNull: false, type: DataType.ARRAY(DataType.STRING) })
  images: [];

  @BelongsToMany(() => Order, () => ProductInCart)
  orders: Order[];

  @BelongsToMany(() => Category, () => ProductCategory)
  categories: Array<ProductCategory & { ProductCategory: ProductCategory }>;

  @BelongsTo(() => Business)
  business: Business;

  @BelongsToMany(() => Person, () => FavouriteProduct)
  favouriteProduct: FavouriteProduct[];

  @HasMany(() => Offer)
  offer: Offer;
}

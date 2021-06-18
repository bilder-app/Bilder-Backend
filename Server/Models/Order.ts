import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsToMany,
  HasOne
} from "sequelize-typescript";
import ProductInOrder from "./ProductInOrder";
import Product from "./Product";
import Person from "./Person";
import Shipping from "./Shipping";

@Table
export default class Order extends Model {
  @ForeignKey(() => Person)
  @Column
  userId: number;

  @BelongsToMany(() => Product, () => ProductInOrder)
  products: Product[];

  @HasOne(() => Shipping)
  shipping: Shipping;

  @Column
  productsPrice: number;

  @Column
  shippingPrice: number;
}

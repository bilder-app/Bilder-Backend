import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Person from "./Person";
import Product from "./Product";

@Table
export default class ProductInCart extends Model {
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @ForeignKey(() => Person)
  @Column
  personId: number;

  @Column({ allowNull: false })
  amount: number;
}

import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Category from "./Category";
import Product from "./Product";

@Table
export default class ProductCategory extends Model {
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @ForeignKey(() => Category)
  @Column
  name: string;

}
import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Product from "./Product";
import SubCategory from "./SubCategory";

@Table
export default class ProductSubCategory extends Model {
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @ForeignKey(() => SubCategory)
  @Column
  subcategory: string;
}

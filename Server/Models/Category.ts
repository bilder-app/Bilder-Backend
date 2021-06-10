import {
  Table,
  Column,
  Model,
  PrimaryKey,
  HasMany,
} from "sequelize-typescript";
import SubCategory from "./SubCategory";
import Product from "./Product";

@Table
export default class Category extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  name: string;

  @HasMany(() => Product)
  products: Product[];

  @HasMany(() => SubCategory)
  subcategories: SubCategory[];
}

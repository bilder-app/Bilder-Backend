import {
  Table,
  Column,
  Model,
  PrimaryKey,
  HasMany,
} from "sequelize-typescript";
import SubCategory from "./SubCategory";

@Table
export default class Category extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  name: string;

  @HasMany(() => SubCategory)
  subcategories: SubCategory[];
}

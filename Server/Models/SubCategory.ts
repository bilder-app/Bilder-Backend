import {
  Table,
  Column,
  Model,
  ForeignKey,
  PrimaryKey,
  BelongsTo,
} from "sequelize-typescript";
import Category from "./Category";

@Table
export default class SubCategory extends Model {

  @PrimaryKey
  @Column({ allowNull: false })
  name: string;

  @ForeignKey(() => Category)
  @Column
  categoryName: string;

  @BelongsTo(() => Category)
  category: Category;
}

import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Category from "./Category";

@Table
export default class SubCategory extends Model {
  @ForeignKey(() => Category)
  @Column
  categoryName: string;

  @Column({ allowNull: false })
  name: string;

  @BelongsTo(() => Category)
  category: Category;
}

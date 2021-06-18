import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsToMany,
  DataType,
} from "sequelize-typescript";
import BusinessProductInOrder from "./BusinessProductInOrder";
import Product from "./Product";
import Business from "./Business";

@Table
export default class BusinessOrder extends Model {
  @ForeignKey(() => Business)
  @Column
  businessId: number;

  @BelongsToMany(() => Product, () => BusinessProductInOrder)
  products: Product[];

  @Column({
    allowNull: false,
    type: DataType.ENUM("preparing", "ready", "sent"),
  })
  state: string;
}

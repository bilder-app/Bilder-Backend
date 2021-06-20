import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import BusinessOrder from "./BusinessOrder";
import Product from "./Product";

@Table
export default class BusinessProductInOrder extends Model {
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @ForeignKey(() => BusinessOrder)
  @Column
  businessOrderId: number;

  @Column({ allowNull: false })
  amount: number;

  @Column({ allowNull: false })
  price: number;
}

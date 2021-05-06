import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Order from "./Order";
import Product from "./Product";

@Table
export default class ProductInOrder extends Model {
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @Column({ allowNull: false })
  amount: number;

  @Column({ allowNull: false })
  price: number;
}

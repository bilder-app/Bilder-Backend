import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Order from "./Order";

@Table
export default class Shipping extends Model {
  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @Column({ allowNull: false })
  state: string;
}

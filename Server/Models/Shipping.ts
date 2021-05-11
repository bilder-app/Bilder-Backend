import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType
} from "sequelize-typescript";
import Order from "./Order";

@Table
export default class Shipping extends Model {
  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @Column({
    allowNull: false,
    type: DataType.ENUM("preparing", "ready", "sent")
  })
  state: string;
}

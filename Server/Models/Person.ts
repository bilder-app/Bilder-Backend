import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany,
  BelongsToMany
} from "sequelize-typescript";
import Order from "./Order";
import Product from "./Product";
import FavouriteProduct from "./FavouriteProduct";
import User from "./User";

@Table
export default class Person extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  lastname: string;

  @Column({ allowNull: true })
  dni: number;

  @Column({ allowNull: true })
  address: string;

  @HasMany(() => Order)
  orders: Order[];

  @BelongsToMany(() => Product, () => FavouriteProduct)
  favorites: FavouriteProduct[];
}

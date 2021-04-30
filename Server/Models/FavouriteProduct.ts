import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Product from "./Product";
import Person from "./Person";

@Table
export default class FavouriteProduct extends Model {
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @ForeignKey(() => Person)
  @Column
  personId: number;

}
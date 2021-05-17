import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import Product from "./Product";
import User from "./User";

@Table
export default class Business extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  image: string;

  @Column({ allowNull: false })
  surname: string;

  @Column({ allowNull: false })
  cuit: string;

  @Column({ allowNull: true })
  sector: string;

  @Column({ allowNull: true })
  address: string;

  @Column({ allowNull: true })
  contact: string;

  @HasMany(() => Product)
  products: Product[];
}

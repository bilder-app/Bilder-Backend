import {
  Table,
  Column,
  Model,
  DataType,
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
  surname: string;

  @Column({ allowNull: false })
  nameBusiness: string;

  @Column({ allowNull: false })
  cuit: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(
      "Bulonera",
      "Ferreteria",
      "Materiales de Construcción",
      "Siderometalurgia",
      "Maderera",
      "Pintureria",
      "Materiales electricos",
      "Griferia",
      "Regatones"
    ),
  })
  sector: string;

  @Column({ allowNull: true })
  address: string;

  @Column({ allowNull: true })
  contact: string;

  @HasMany(() => Product)
  products: Product[];
}

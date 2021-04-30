import { Table, Column, Model, ForeignKey} from 'sequelize-typescript'
import Product from './Product'

@Table
export default class Offer extends Model {

  @ForeignKey(() => Product)
  @Column
  productId : number

  @Column({ allowNull: false })
  start: Date

  @Column({ allowNull: false })
  end: Date

  @Column({ allowNull: false })
  percentage: number

}
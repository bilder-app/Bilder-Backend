import { Table, Column, Model, PrimaryKey} from 'sequelize-typescript'

@Table
export default class Category extends Model {

  @PrimaryKey
  @Column({ allowNull: false })
  name: string
}
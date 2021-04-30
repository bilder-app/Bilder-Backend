import { Table, Column, Model, HasOne} from 'sequelize-typescript'
import Business from './Business'
import Person from './Person'

@Table
export default class User extends Model {
  @Column({ allowNull: false })
  email: string

  @Column({ allowNull: false })
  password: string
  
  @HasOne(() => Person)
  person: Person

  @HasOne(() => Business)
  business: Business
}
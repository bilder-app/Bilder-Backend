import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsToMany,
  BelongsTo,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import Business from "./Business";
import SubCategory from "./SubCategory";
import Category from "./Category";
import Order from "./Order";
import ProductInCart from "./ProductInCart";
import ProductInOrder from "./ProductInOrder";
import ProductSubCategory from "./ProductSubCategory";
import Person from "./Person";
import FavouriteProduct from "./FavouriteProduct";
import Offer from "./Offer";

@Table
export default class Product extends Model {
  @ForeignKey(() => Business)
  @Column
  businessId: number;

  @ForeignKey(() => Category)
  @Column
  categoryName: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  price: number;

  @Column({ allowNull: false })
  stock: number;

  @Column({ allowNull: true })
  content: number;

  @Column({
    allowNull: false,
    type: DataType.ENUM(
      "Kilo (k)",
      "Gramo (g)",
      "Metro (m)",
      "Metro cuadrado(m2)",
      "Metro cúbico (m3)",
      "Centimetro (cm)",
      "Centimetro cúbico (cc)",
      "Pulgada ('')",
      "Litro (l)",
      "Militro (ml)",
      "Unidad (u)",
      "Watt (w) "
    ),
  })
  contentType: string;

  @Column({ allowNull: true })
  model: string;

  @Column({ allowNull: true })
  brand: string;

  @Column({ allowNull: false, type: DataType.ARRAY(DataType.STRING) })
  images: [];

  @HasMany(() => ProductInOrder)
  orders: Order[];

  @BelongsToMany(() => Person, () => ProductInCart)
  people: Person[];

  @BelongsToMany(() => SubCategory, () => ProductSubCategory)
  subcategories: Array<
    ProductSubCategory & { ProductSubCategory: ProductSubCategory }
  >;

  @BelongsTo(() => Business)
  business: Business;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsToMany(() => Person, () => FavouriteProduct)
  favouriteProduct: FavouriteProduct[];

  @HasMany(() => Offer)
  offers: Array<Offer & { Offer: Offer }>;
}

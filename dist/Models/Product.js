"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Business_1 = __importDefault(require("./Business"));
const Category_1 = __importDefault(require("./Category"));
const Order_1 = __importDefault(require("./Order"));
const ProductInCart_1 = __importDefault(require("./ProductInCart"));
const ProductCategory_1 = __importDefault(require("./ProductCategory"));
const Person_1 = __importDefault(require("./Person"));
const FavouriteProduct_1 = __importDefault(require("./FavouriteProduct"));
const Offer_1 = __importDefault(require("./Offer"));
let Product = class Product extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => Business_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Product.prototype, "businessId", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, type: sequelize_typescript_1.DataType.STRING(20) }),
    __metadata("design:type", String)
], Product.prototype, "shortDescription", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING) }),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Order_1.default, () => ProductInCart_1.default),
    __metadata("design:type", Array)
], Product.prototype, "orders", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Category_1.default, () => ProductCategory_1.default),
    __metadata("design:type", Array)
], Product.prototype, "categories", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Business_1.default),
    __metadata("design:type", Business_1.default)
], Product.prototype, "business", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Person_1.default, () => FavouriteProduct_1.default),
    __metadata("design:type", Array)
], Product.prototype, "favouriteProduct", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Offer_1.default),
    __metadata("design:type", Offer_1.default)
], Product.prototype, "offer", void 0);
Product = __decorate([
    sequelize_typescript_1.Table
], Product);
exports.default = Product;

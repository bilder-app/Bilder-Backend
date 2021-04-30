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
const ProductInCart_1 = __importDefault(require("./ProductInCart"));
const Product_1 = __importDefault(require("./Product"));
const Person_1 = __importDefault(require("./Person"));
const Shipping_1 = __importDefault(require("./Shipping"));
let Order = class Order extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => Person_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Order.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false,
        type: sequelize_typescript_1.DataType.ENUM("pending", "cancelled", "completed")
    }),
    __metadata("design:type", Array)
], Order.prototype, "state", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Product_1.default, () => ProductInCart_1.default),
    __metadata("design:type", Array)
], Order.prototype, "products", void 0);
__decorate([
    sequelize_typescript_1.HasOne(() => Shipping_1.default),
    __metadata("design:type", Shipping_1.default)
], Order.prototype, "shipping", void 0);
Order = __decorate([
    sequelize_typescript_1.Table
], Order);
exports.default = Order;

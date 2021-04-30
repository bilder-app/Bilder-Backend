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
const Order_1 = __importDefault(require("./Order"));
const Product_1 = __importDefault(require("./Product"));
const FavouriteProduct_1 = __importDefault(require("./FavouriteProduct"));
const User_1 = __importDefault(require("./User"));
let Person = class Person extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Person.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Person.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Person.prototype, "lastname", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: true }),
    __metadata("design:type", Number)
], Person.prototype, "dni", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: true }),
    __metadata("design:type", String)
], Person.prototype, "address", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Order_1.default),
    __metadata("design:type", Array)
], Person.prototype, "orders", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Product_1.default, () => FavouriteProduct_1.default),
    __metadata("design:type", Array)
], Person.prototype, "favorites", void 0);
Person = __decorate([
    sequelize_typescript_1.Table
], Person);
exports.default = Person;

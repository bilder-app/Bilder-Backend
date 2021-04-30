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
const Product_1 = __importDefault(require("./Product"));
const User_1 = __importDefault(require("./User"));
let Business = class Business extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Business.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Business.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Business.prototype, "cuit", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: true }),
    __metadata("design:type", String)
], Business.prototype, "sector", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: true }),
    __metadata("design:type", String)
], Business.prototype, "address", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: true }),
    __metadata("design:type", String)
], Business.prototype, "contact", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Product_1.default),
    __metadata("design:type", Array)
], Business.prototype, "products", void 0);
Business = __decorate([
    sequelize_typescript_1.Table
], Business);
exports.default = Business;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = require("supertest");
const server_1 = __importDefault(require("../../server"));
const Index_1 = __importDefault(require("../../Index"));
const faker_1 = __importDefault(require("faker"));
const Product_1 = __importDefault(require("../../Models/Product"));
const app = supertest_1.agent(server_1.default);
const products = [];
for (let i = 0; i < 20; i++) {
    const productName = faker_1.default.commerce.product();
    products.push({
        name: productName,
        price: +faker_1.default.commerce.price(),
        stock: ~~(Math.random() * 150),
        description: faker_1.default.commerce.productDescription(),
        shortDescription: faker_1.default.commerce.productAdjective() + " - " + productName,
        images: [faker_1.default.image.technics()]
    });
}
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Index_1.default.sync({ force: true });
    yield Product_1.default.bulkCreate(products);
}));
describe("/product", () => {
    describe("GET / should return", () => {
        test("a status of 200", (done) => {
            app.get("/product/").expect(200).end(done);
        });
        test("an array with all products' details", (done) => {
            app
                .get("/product/")
                .expect(200)
                .then(({ body }) => {
                expect(Array.isArray(body)).toBe(true);
                expect(body.length).toEqual(products.length);
                body.every((product, i) => {
                    expect(product).toEqual(expect.objectContaining({
                        name: products[i].name,
                        price: products[i].price,
                        stock: products[i].stock,
                        description: products[i].description,
                        shortDescription: products[i].shortDescription,
                        images: products[i].images
                    }));
                });
                done();
            });
        });
    });
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Index_1.default.close();
}));

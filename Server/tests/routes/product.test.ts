import { agent } from "supertest";
import server from "../../server";
import db from "../../Index";
import faker from "faker";
import Product from "../../Models/Product";

const app = agent(server);

const products: any = [];

for (let i = 0; i < 20; i++) {
  const productName = faker.commerce.product();
  products.push({
    name: productName,
    price: +faker.commerce.price(),
    stock: ~~(Math.random() * 150),
    description: faker.commerce.productDescription(),
    shortDescription: faker.commerce.productAdjective() + " - " + productName,
    images: [faker.image.technics()]
  });
}

beforeAll(async () => {
  await db.sync({ force: true });
  await Product.bulkCreate(products);
});

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
          body.every((product: any, i: number) => {
            expect(product).toEqual(
              expect.objectContaining({
                name: products[i].name,
                price: products[i].price,
                stock: products[i].stock,
                description: products[i].description,
                shortDescription: products[i].shortDescription,
                images: products[i].images
              })
            );
          });
          done();
        });
    });
  });
});

afterAll(async () => {
  await db.close();
});

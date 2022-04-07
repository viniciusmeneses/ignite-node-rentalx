import { hash } from "bcryptjs";
import request from "supertest";
import { v4 as uuidv4 } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { app } from "@shared/infra/http/app";
import { dataSource } from "@shared/infra/typeorm";

describe("List categories controller", () => {
  beforeAll(async () => {
    await dataSource.initialize();
    await dataSource.runMigrations();

    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        id: uuidv4(),
        name: "admin",
        email: "admin@rentalx.com.br",
        password: await hash("admin", 8),
        is_admin: true,
        driver_license: "XXXXXX",
      })
      .execute();
  });

  it("should be able to list all categories", async () => {
    const { body: tokenBody } = await request(app).post("/sessions").send({
      email: "admin@rentalx.com.br",
      password: "admin",
    });

    await request(app)
      .post("/categories")
      .send({
        name: "Category Example",
        description: "Category Desc",
      })
      .set({
        Authorization: `Bearer ${tokenBody.token}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Example");
  });

  afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });
});

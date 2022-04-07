import { hash } from "bcryptjs";
import request from "supertest";
import { v4 as uuidv4 } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { app } from "@shared/infra/http/app";
import { dataSource } from "@shared/infra/typeorm";

describe("Create category controller", () => {
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

  it("should be able to create a new category", async () => {
    const { body: tokenBody } = await request(app).post("/sessions").send({
      email: "admin@rentalx.com.br",
      password: "admin",
    });

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Example",
        description: "Category Desc",
      })
      .set({
        Authorization: `Bearer ${tokenBody.token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with name exists", async () => {
    const { body: tokenBody } = await request(app).post("/sessions").send({
      email: "admin@rentalx.com.br",
      password: "admin",
    });

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Example",
        description: "Category Desc",
      })
      .set({
        Authorization: `Bearer ${tokenBody.token}`,
      });

    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });
});

import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === "test" ? "rentalx_test" : process.env.DB_NAME,
  migrations:
    process.env.NODE_ENV === "production"
      ? ["./dist/shared/infra/typeorm/migrations/*.js"]
      : ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities:
    process.env.NODE_ENV === "production"
      ? ["./dist/modules/**/entities/*.js"]
      : ["./src/modules/**/entities/*.ts"],
});

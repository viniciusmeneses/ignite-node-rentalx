import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  host: "host.docker.internal",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentalx",
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
});

dataSource.initialize();

export { dataSource };

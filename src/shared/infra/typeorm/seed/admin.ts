import { v4 as uuidv4 } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { hash } from "bcryptjs";

import { dataSource } from "..";

(async () => {
  try {
    await dataSource.initialize();

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

    console.log("Admin user created!");
  } catch {
    console.log("Failed to create an admin user!");
  }

  process.exit();
})();

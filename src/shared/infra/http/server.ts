import "dotenv/config";
import { dataSource } from "../typeorm";
import { app } from "./app";

dataSource
  .initialize()
  .then(() =>
    app.listen(3333, () => console.log("Server started on port 3333"))
  );

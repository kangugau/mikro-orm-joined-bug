import { Options } from "@mikro-orm/core";
import { MySqlDriver } from "@mikro-orm/mysql";
import { Customer, Role } from "./entities";

const config: Options<MySqlDriver> = {
  entities: [Customer, Role], // path to our JS entities (dist), relative to `baseDir`
  // entitiesTs: ["./entities"], // path to our TS entities (src), relative to `baseDir`
  dbName: "my-db",
  type: "mysql",
  user: "root",
  password: "root",
};

export default config;

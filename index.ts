import { MikroORM, MySqlDriver } from "@mikro-orm/mysql"; // or any other driver package
import config from "./mikro-orm.config";
import { Customer, Role } from "./entities";
import { LoadStrategy } from "@mikro-orm/core";

async function bootstrap() {
  const orm = await MikroORM.init<MySqlDriver>(config);
  const em = orm.em.fork();

  const roles = [
    em.create(Role, { name: "customer" }),
    em.create(Role, { name: "reseller" }),
  ];
  const customers = Array(1000)
    .fill(0)
    .map((el, index) =>
      em.create(Customer, {
        name: `customer-${index}`,
        roles: [roles[index % roles.length]],
      })
    );

  await em.flush();

  const newEm = orm.em.fork();
  const customersByJoined = await newEm
    .getRepository(Customer)
    .findAll({ strategy: LoadStrategy.JOINED, populate: ["roles.name"] });

  const customersBySelectIn = await newEm
    .getRepository(Customer)
    .findAll({ populate: ["roles.name"] });

  console.log(customersByJoined.length, customersBySelectIn.length);

  orm.close();
}

bootstrap();

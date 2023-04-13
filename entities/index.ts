import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  Type,
} from "@mikro-orm/core";
import { parse, stringify, v1 } from "uuid";

class UuidBinaryType extends Type<string, Buffer> {
  convertToDatabaseValue(uuid) {
    return uuid && Buffer.from(parse(uuid));
  }

  convertToJSValue(bin) {
    if (!bin) return "";
    if (typeof bin === "string") return bin;
    return stringify(bin);
  }

  getColumnType() {
    return "binary(16)";
  }
}

@Entity()
export class Customer {
  @PrimaryKey({
    type: UuidBinaryType,
  })
  uuid: string = v1();

  @Property()
  name!: string;

  @ManyToMany(() => Role, "customers", {
    owner: true,
  })
  roles!: Collection<Role>;
}

@Entity()
export class Role {
  @PrimaryKey({
    type: UuidBinaryType,
  })
  uuid: string = v1();

  @Property()
  name!: string;

  @ManyToMany(() => Customer, "roles")
  customers!: Collection<Customer>;
}

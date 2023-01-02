import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { CreateCategories1670296439736 } from "./migrations/1670296439736-CreateCategories";
import { CreateSpecifications1670337421055 } from "./migrations/1670337421055-CreateSpecifications";
import { CreateUsers1670424711380 } from "./migrations/1670424711380-CreateUsers";
import { AlterUserDeleteUsername1670427024817 } from "./migrations/1670427024817-AlterUserDeleteUsername";
import { AlterUserAddIsPrimaryInId1670428168221 } from "./migrations/1670428168221-AlterUserAddIsPrimaryInId";
import { AlterUserAddAvatar1670716291820 } from "./migrations/1670716291820-AlterUserAddAvatar";
import { CreateCars1670855698559 } from "./migrations/1670855698559-CreateCars";
import { CreateSpecificationsCars1671247200445 } from "./migrations/1671247200445-CreateSpecificationsCars";
import { CreateCarsImages1671571271878 } from "./migrations/1671571271878-CreateCarsImages";
import { CreateRentals1671575587833 } from "./migrations/1671575587833-CreateRentals";
import { CreateUsersToken1672081548776 } from "./migrations/1672081548776-CreateUsersToken";

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: process.env.NODE_ENV === "test" ? "rentx_test" : "rentalx",
  entities: [Category, Specification, User, Car, CarImage, Rental, UserTokens],
  migrations: [
    CreateCategories1670296439736,
    CreateSpecifications1670337421055,
    CreateUsers1670424711380,
    AlterUserDeleteUsername1670427024817,
    AlterUserAddIsPrimaryInId1670428168221,
    AlterUserAddAvatar1670716291820,
    CreateCars1670855698559,
    CreateSpecificationsCars1671247200445,
    CreateCarsImages1671571271878,
    CreateRentals1671575587833,
    CreateUsersToken1672081548776,
  ],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;

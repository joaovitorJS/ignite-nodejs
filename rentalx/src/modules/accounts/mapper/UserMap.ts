import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    email,
    avatar,
    id,
    driver_license,
    name,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      avatar,
      id,
      driver_license,
      name,
      avatar_url,
    });

    return user;
  }
}

export { UserMap };

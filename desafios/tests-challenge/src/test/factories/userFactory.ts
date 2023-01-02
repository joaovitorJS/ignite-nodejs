import { ICreateUserDTO } from "../../modules/users/useCases/createUser/ICreateUserDTO";


type Override = Partial<ICreateUserDTO>;

export function makeUser(override: Override = {}) {
  return {
    name: "John Doe",
    email: "john_doe@mail.com",
    password: "1234",
    ...override,
  }
}
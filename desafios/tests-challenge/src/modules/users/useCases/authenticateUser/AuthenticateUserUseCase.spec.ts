import { makeUser } from "../../../../test/factories/userFactory";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let usersRepositoryInMemory: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    // Criando um usuário para realizar a autenticação
    const user = await createUserUseCase.execute(makeUser({ password: "1234" }));

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: "1234"
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate with incorrect email", async () => {
    await createUserUseCase.execute(makeUser({ password: "1234" }));

    await expect(
      authenticateUserUseCase.execute({
        email: "incorrect_email@mail.com",
        password: "1234"
      })
    ).rejects.toEqual(new IncorrectEmailOrPasswordError());
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user = await createUserUseCase.execute(makeUser({ password: "1234" }));

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect-password"
      })
    ).rejects.toEqual(new IncorrectEmailOrPasswordError());
  });
});
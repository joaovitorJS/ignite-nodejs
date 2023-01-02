import { makeUser } from "../../../../test/factories/userFactory";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute(
      makeUser()
    );

    expect(user).toHaveProperty("id");
    expect(user.created_at).not.toBeNull();
  });

  it("should not be able to create user with email an existing email", async () => {
    await createUserUseCase.execute(makeUser({ name: "John Doe" }));

    await expect(
      createUserUseCase.execute(makeUser({ name: "John Doe 2" }))
    ).rejects.toBeInstanceOf(CreateUserError)
  });
});
import { makeUser } from "../../../../test/factories/userFactory";
import { User } from "../../entities/User";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let showUserProfileUseCase: ShowUserProfileUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;

describe("Show User Profile", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepositoryInMemory);
  });

  it("should be able show user profile", async () => {
    const user = await usersRepositoryInMemory.create(makeUser());

    const userProfile = await showUserProfileUseCase.execute(String(user.id));

    expect(userProfile).toHaveProperty("id");
    expect(userProfile.id).toBe(user.id);
  });

  it("should not be able show user profile if non-existing user", async () => {
    await usersRepositoryInMemory.create(makeUser());

    await expect(
      showUserProfileUseCase.execute("invalid-id")
    ).rejects.toEqual(new ShowUserProfileError());
  });
});
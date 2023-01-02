import { makeUser } from "../../../../test/factories/userFactory";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementError } from "./CreateStatementError";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let statementsRepositoryInMemory: InMemoryStatementsRepository;
let usersRepositoryInMemory: InMemoryUsersRepository;
let createStatementUseCase: CreateStatementUseCase;


describe("Create Statement", () => {
  beforeEach(() => {
    statementsRepositoryInMemory = new InMemoryStatementsRepository();
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createStatementUseCase = new CreateStatementUseCase(
      usersRepositoryInMemory,
      statementsRepositoryInMemory
    );
  });

  it("should be able to create user statement", async () => {
    const user = await usersRepositoryInMemory.create(makeUser());

    const statement = await createStatementUseCase.execute({
      user_id: String(user.id),
      amount: 500,
      description: "Statement 1",
      type: "deposit" as OperationType.DEPOSIT,
    });

    expect(statement).toHaveProperty("id");
  });

  it("should not be able to create statement if user not found", async () => {
    await expect(
      createStatementUseCase.execute({
        user_id: "invalid-id",
        amount: 500,
        description: "Statement 1",
        type: "deposit" as OperationType.DEPOSIT,
      })
    ).rejects.toEqual(new CreateStatementError.UserNotFound());
  });

  it("should not be able to create withdraw if user have insufficient funds", async () => {
    const user = await usersRepositoryInMemory.create(makeUser());

    await expect(
      createStatementUseCase.execute({
        user_id: String(user.id),
        amount: 500,
        description: "Statement 1",
        type: "withdraw" as OperationType.WITHDRAW,
      })
    ).rejects.toEqual(new CreateStatementError.InsufficientFunds());
  });
});
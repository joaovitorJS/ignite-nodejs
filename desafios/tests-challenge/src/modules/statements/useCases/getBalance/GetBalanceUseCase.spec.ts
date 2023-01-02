import { makeUser } from "../../../../test/factories/userFactory";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetBalanceError } from "./GetBalanceError";
import { GetBalanceUseCase } from "./GetBalanceUseCase";


let statementsRepositoryInMemory: InMemoryStatementsRepository;
let usersRepositoryInMemory: InMemoryUsersRepository;
let getBalanceUseCase: GetBalanceUseCase;

describe("Get User Balance", () => {
  beforeEach(() => {
    statementsRepositoryInMemory = new InMemoryStatementsRepository();
    usersRepositoryInMemory = new InMemoryUsersRepository();
    getBalanceUseCase = new GetBalanceUseCase(
      statementsRepositoryInMemory,
      usersRepositoryInMemory
    );

  });

  it("should be able get user balance", async () => {
    const user = await usersRepositoryInMemory.create(makeUser());

    await statementsRepositoryInMemory.create({
      user_id: String(user.id),
      amount: 500,
      description: "Statement 1",
      type: "deposit" as OperationType.DEPOSIT,
    });

    await statementsRepositoryInMemory.create({
      user_id: String(user.id),
      amount: 300,
      description: "Statement 2",
      type: "withdraw" as OperationType.WITHDRAW,
    });

    const balance = await getBalanceUseCase.execute({ user_id: String(user.id) });

    expect(balance.statement).toHaveLength(2);
    expect(balance.balance).toBe(200);
  });

  it("should not be able get user balance if non-existing user", async () => {
    await expect(
      getBalanceUseCase.execute({ user_id: "invalid-id" })
    ).rejects.toEqual(new GetBalanceError());
  });
});
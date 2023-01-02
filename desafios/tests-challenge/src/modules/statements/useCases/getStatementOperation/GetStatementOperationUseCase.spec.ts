import { makeUser } from "../../../../test/factories/userFactory";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetStatementOperationError } from "./GetStatementOperationError";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";


let statementsRepositoryInMemory: InMemoryStatementsRepository;
let usersRepositoryInMemory: InMemoryUsersRepository;
let getStatementOperationUseCase: GetStatementOperationUseCase;

describe("Get Statement Operation", () => {
  beforeEach(() => {
    statementsRepositoryInMemory = new InMemoryStatementsRepository();
    usersRepositoryInMemory = new InMemoryUsersRepository();
    getStatementOperationUseCase = new GetStatementOperationUseCase(
      usersRepositoryInMemory,
      statementsRepositoryInMemory
    );
  });

  it("should be able get statement operation", async () => {
    const user = await usersRepositoryInMemory.create(makeUser());

    const statement = await statementsRepositoryInMemory.create({
      amount: 300,
      description: "statement 1",
      type: "deposit" as OperationType.DEPOSIT,
      user_id: String(user.id),
    });

    const statementFound = await getStatementOperationUseCase.execute({
      user_id: String(user.id),
      statement_id: String(statement.id),
    });

    expect(statementFound.type).toBe("deposit");
    expect(statementFound).toEqual(statement);
  });

  it("should not be able get statement operation if non-existing user", async () => {
    await expect(getStatementOperationUseCase.execute({
      user_id: "invalid-user-id",
      statement_id: "statement-id",
    })).rejects.toEqual(new GetStatementOperationError.UserNotFound());
  });

  it("should not be able get statement operation if non-existing statement", async () => {
    const user = await usersRepositoryInMemory.create(makeUser());

    await expect(getStatementOperationUseCase.execute({
      user_id: String(user.id),
      statement_id: "invalid-statement-id",
    })).rejects.toEqual(new GetStatementOperationError.StatementNotFound());
  });
});
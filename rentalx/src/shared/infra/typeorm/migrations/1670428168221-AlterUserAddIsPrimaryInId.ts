import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserAddIsPrimaryInId1670428168221
  // eslint-disable-next-line prettier/prettier
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "id_primary_key" PRIMARY KEY ("id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "id_primary_key"`
    );
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1674248608997 implements MigrationInterface {
    name = 'UpdateUsers1674248608997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "userName" TO "username"`);
        await queryRunner.query(`ALTER TABLE "bonsais" ALTER COLUMN "bonsaiCreationDate" SET DEFAULT '1900-01-01'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bonsais" ALTER COLUMN "bonsaiCreationDate" SET DEFAULT '1900-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "username" TO "userName"`);
    }

}

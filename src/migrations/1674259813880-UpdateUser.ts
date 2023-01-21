import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1674259813880 implements MigrationInterface {
    name = 'UpdateUser1674259813880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bonsais" ALTER COLUMN "bonsaiCreationDate" SET DEFAULT '1900-01-01'`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "bonsais" ALTER COLUMN "bonsaiCreationDate" SET DEFAULT '1900-01-01 00:00:00'`);
    }

}

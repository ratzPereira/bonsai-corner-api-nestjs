import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1674231310717 implements MigrationInterface {
    name = 'CreateUsers1674231310717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "userName" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bonsais" ALTER COLUMN "bonsaiCreationDate" SET DEFAULT '1900-01-01'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bonsais" ALTER COLUMN "bonsaiCreationDate" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}

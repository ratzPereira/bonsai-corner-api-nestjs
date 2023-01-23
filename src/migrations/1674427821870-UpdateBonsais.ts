import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBonsais1674427821870 implements MigrationInterface {
    name = 'UpdateBonsais1674427821870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bonsais" ADD "bonsaiUpdatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "bonsais" ADD "favoritesCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "bonsais" ALTER COLUMN "bonsaiCreationDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "bonsais" DROP COLUMN "interventions"`);
        await queryRunner.query(`ALTER TABLE "bonsais" ADD "interventions" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bonsais" ADD "isPublic" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bonsais" DROP COLUMN "interventions"`);
        await queryRunner.query(`ALTER TABLE "bonsais" ADD "interventions" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bonsais" ALTER COLUMN "bonsaiCreationDate" SET DEFAULT '1900-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "bonsais" DROP COLUMN "favoritesCount"`);
        await queryRunner.query(`ALTER TABLE "bonsais" DROP COLUMN "bonsaiUpdatedDate"`);
        await queryRunner.query(`ALTER TABLE "bonsais" DROP COLUMN "isPublic"`);
    }

}

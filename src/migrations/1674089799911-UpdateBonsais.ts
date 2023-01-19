import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBonsais1674089799911 implements MigrationInterface {
    name = 'UpdateBonsais1674089799911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bonsais" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bonsais" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bonsais" ADD "images" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bonsais" ADD "bonsaiCreationDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bonsais" ADD "spicies" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bonsais" ADD "interventions" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bonsais" DROP COLUMN "interventions"`);
        await queryRunner.query(`ALTER TABLE "bonsais" DROP COLUMN "spicies"`);
        await queryRunner.query(`ALTER TABLE "bonsais" DROP COLUMN "bonsaiCreationDate"`);
        await queryRunner.query(`ALTER TABLE "bonsais" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "bonsais" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "bonsais" DROP COLUMN "age"`);
    }

}

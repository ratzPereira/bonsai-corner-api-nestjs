import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBonsais1674073246959 implements MigrationInterface {
    name = 'CreateBonsais1674073246959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bonsais" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_784139eb6235c4c243822475a3f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bonsais"`);
    }

}

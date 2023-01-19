import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBonsais1674126431034 implements MigrationInterface {
    name = 'UpdateBonsais1674126431034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bonsais" RENAME COLUMN "spicies" TO "species"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bonsais" RENAME COLUMN "species" TO "spicies"`);
    }

}

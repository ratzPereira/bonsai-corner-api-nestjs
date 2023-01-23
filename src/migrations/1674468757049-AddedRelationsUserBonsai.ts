import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRelationsUserBonsai1674468757049 implements MigrationInterface {
    name = 'AddedRelationsUserBonsai1674468757049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bonsais" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "bonsais" ADD CONSTRAINT "FK_f3e19b83ac0c3ff48378aff41de" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bonsais" DROP CONSTRAINT "FK_f3e19b83ac0c3ff48378aff41de"`);
        await queryRunner.query(`ALTER TABLE "bonsais" DROP COLUMN "ownerId"`);
    }

}

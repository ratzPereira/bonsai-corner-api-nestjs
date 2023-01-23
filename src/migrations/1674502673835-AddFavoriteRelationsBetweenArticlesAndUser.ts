import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFavoriteRelationsBetweenArticlesAndUser1674502673835 implements MigrationInterface {
    name = 'AddFavoriteRelationsBetweenArticlesAndUser1674502673835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_favorites_bonsais" ("usersId" integer NOT NULL, "bonsaisId" integer NOT NULL, CONSTRAINT "PK_edd9f40734d9a76d1e5e5a63508" PRIMARY KEY ("usersId", "bonsaisId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_74bc56b76775786bea0c964cf3" ON "users_favorites_bonsais" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_721ca3a58b2b5a4287bbe58b17" ON "users_favorites_bonsais" ("bonsaisId") `);
        await queryRunner.query(`ALTER TABLE "users_favorites_bonsais" ADD CONSTRAINT "FK_74bc56b76775786bea0c964cf3f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorites_bonsais" ADD CONSTRAINT "FK_721ca3a58b2b5a4287bbe58b177" FOREIGN KEY ("bonsaisId") REFERENCES "bonsais"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_favorites_bonsais" DROP CONSTRAINT "FK_721ca3a58b2b5a4287bbe58b177"`);
        await queryRunner.query(`ALTER TABLE "users_favorites_bonsais" DROP CONSTRAINT "FK_74bc56b76775786bea0c964cf3f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_721ca3a58b2b5a4287bbe58b17"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_74bc56b76775786bea0c964cf3"`);
        await queryRunner.query(`DROP TABLE "users_favorites_bonsais"`);
    }

}

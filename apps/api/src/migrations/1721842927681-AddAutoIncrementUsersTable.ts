import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAutoIncrementUsersTable1721842927681 implements MigrationInterface {
    name = 'AddAutoIncrementUsersTable1721842927681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "user_id_seq" OWNED BY "user"."id"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT nextval('"user_id_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "user_id_seq"`);
    }

}

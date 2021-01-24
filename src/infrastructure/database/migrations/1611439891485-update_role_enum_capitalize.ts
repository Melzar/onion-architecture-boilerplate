import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRoleEnumCapitalize1611439891485 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TYPE "role_name_enum" RENAME TO "role_name_enum_old"`);
        await queryRunner.query(`CREATE TYPE "role_name_enum" AS ENUM('ADMIN', 'MEMBER')`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" TYPE VARCHAR`);
        await queryRunner.query(`UPDATE "role" SET "name" = UPPER("name")`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" TYPE "role_name_enum" USING "name"::"text"::"role_name_enum"`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" SET DEFAULT 'MEMBER'`);
        await queryRunner.query(`DROP TYPE "role_name_enum_old"`);
        await queryRunner.query(`COMMENT ON COLUMN "role"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" SET DEFAULT 'MEMBER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" SET DEFAULT 'member'`);
        await queryRunner.query(`COMMENT ON COLUMN "role"."name" IS NULL`);
        await queryRunner.query(`CREATE TYPE "role_name_enum_old" AS ENUM('admin', 'member')`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`UPDATE "role" SET "name" = LOWER("name")`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" TYPE "role_name_enum_old" USING "name"::"text"::"role_name_enum_old"`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" SET DEFAULT 'MEMBER'`);
        await queryRunner.query(`DROP TYPE "role_name_enum"`);
        await queryRunner.query(`ALTER TYPE "role_name_enum_old" RENAME TO  "role_name_enum"`);
    }

}

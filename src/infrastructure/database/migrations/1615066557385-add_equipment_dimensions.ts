import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEquipmentDimensions1615066557385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "equipment" ADD "width" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" ADD "height" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" ADD "depth" integer NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "depth"`);
    await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "height"`);
    await queryRunner.query(`ALTER TABLE "equipment" DROP COLUMN "width"`);
  }
}

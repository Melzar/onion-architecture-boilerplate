import { MigrationInterface, QueryRunner } from 'typeorm';

export class addWarehouseDimensionsCosts1615066763427
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "warehouse" ADD "widthCost" numeric(10,2) NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse" ADD "heightCost" numeric(10,2) NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse" ADD "depthCost" numeric(10,2) NOT NULL DEFAULT '0'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "warehouse" DROP COLUMN "depthCost"`);
    await queryRunner.query(`ALTER TABLE "warehouse" DROP COLUMN "heightCost"`);
    await queryRunner.query(`ALTER TABLE "warehouse" DROP COLUMN "widthCost"`);
  }
}

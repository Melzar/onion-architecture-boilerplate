import { MigrationInterface, QueryRunner } from 'typeorm';

export class addWarehousePropertiesAvailabilityCapacity1615067499391
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "warehouse" ADD "available" boolean NOT NULL DEFAULT false`
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse" ADD "capacityWidth" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse" ADD "capacityHeight" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse" ADD "capacityDepth" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse" ADD "capacityWidthLoad" integer NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse" ADD "capacityHeightLoad" integer NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse" ADD "capacityDepthLoad" integer NOT NULL DEFAULT '0'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "warehouse" DROP COLUMN "capacityDepthLoad"`
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse" DROP COLUMN "capacityHeightLoad"`
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse" DROP COLUMN "capacityWidthLoad"`
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse" DROP COLUMN "capacityDepth"`
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse" DROP COLUMN "capacityHeight"`
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse" DROP COLUMN "capacityWidth"`
    );
    await queryRunner.query(`ALTER TABLE "warehouse" DROP COLUMN "available"`);
  }
}

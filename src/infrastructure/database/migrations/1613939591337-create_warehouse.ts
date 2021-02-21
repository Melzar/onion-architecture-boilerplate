import { MigrationInterface, QueryRunner } from 'typeorm';

export class createWarehouse1613939591337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "warehouse" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "stateId" integer, CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse" ADD CONSTRAINT "FK_23423cf338d68b4927704b6be0e" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "warehouse" DROP CONSTRAINT "FK_23423cf338d68b4927704b6be0e"`
    );
    await queryRunner.query(`DROP TABLE "warehouse"`);
  }
}

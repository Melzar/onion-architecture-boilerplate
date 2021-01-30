import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRate1611436650648 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "rate" ("id" SERIAL NOT NULL, "value" numeric(3,1) NOT NULL, CONSTRAINT "PK_2618d0d38af322d152ccc328f33" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "rate"`);
  }
}

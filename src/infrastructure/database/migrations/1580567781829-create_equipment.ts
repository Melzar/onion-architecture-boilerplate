import { MigrationInterface, QueryRunner } from 'typeorm';

export class createEquipment1580567781829 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "equipment" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_0722e1b9d6eb19f5874c1678740" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "equipment" ADD CONSTRAINT "FK_520c92e8181b4020f047e20e7c3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "equipment" DROP CONSTRAINT "FK_520c92e8181b4020f047e20e7c3"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "equipment"`, undefined);
  }
}

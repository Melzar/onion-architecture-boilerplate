import { MigrationInterface, QueryRunner } from 'typeorm';

export class createEquipmentStateRate1611439711158
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "equipment_state_rate" ("stateId" integer NOT NULL, "equipmentId" integer NOT NULL, "rateId" integer NOT NULL, CONSTRAINT "PK_dab17f51a838eb9bb10c0604c29" PRIMARY KEY ("stateId", "equipmentId", "rateId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "equipment_state_rate" ADD CONSTRAINT "FK_8b120a96a437cbe83b5aed17c71" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "equipment_state_rate" ADD CONSTRAINT "FK_3a17f1311eb3963a16a6b170245" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "equipment_state_rate" ADD CONSTRAINT "FK_8c0672ca02121391adae5eaf432" FOREIGN KEY ("rateId") REFERENCES "rate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "equipment_state_rate" DROP CONSTRAINT "FK_8c0672ca02121391adae5eaf432"`
    );
    await queryRunner.query(
      `ALTER TABLE "equipment_state_rate" DROP CONSTRAINT "FK_3a17f1311eb3963a16a6b170245"`
    );
    await queryRunner.query(
      `ALTER TABLE "equipment_state_rate" DROP CONSTRAINT "FK_8b120a96a437cbe83b5aed17c71"`
    );
    await queryRunner.query(`DROP TABLE "equipment_state_rate"`);
  }
}

import {MigrationInterface, QueryRunner} from "typeorm";

export class createStateRatesRate1611487349958 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "state_rates_rate" ("stateId" integer NOT NULL, "rateId" integer NOT NULL, CONSTRAINT "PK_1235b8c6cd27b19ab43b2bf64ee" PRIMARY KEY ("stateId", "rateId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_29847b774096ece14e79dc6d8c" ON "state_rates_rate" ("stateId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5a281a1ad4fd97934063da48c0" ON "state_rates_rate" ("rateId") `);
        await queryRunner.query(`ALTER TABLE "state_rates_rate" ADD CONSTRAINT "FK_29847b774096ece14e79dc6d8c7" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "state_rates_rate" ADD CONSTRAINT "FK_5a281a1ad4fd97934063da48c0d" FOREIGN KEY ("rateId") REFERENCES "rate"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "state_rates_rate" DROP CONSTRAINT "FK_5a281a1ad4fd97934063da48c0d"`);
        await queryRunner.query(`ALTER TABLE "state_rates_rate" DROP CONSTRAINT "FK_29847b774096ece14e79dc6d8c7"`);
        await queryRunner.query(`DROP INDEX "IDX_5a281a1ad4fd97934063da48c0"`);
        await queryRunner.query(`DROP INDEX "IDX_29847b774096ece14e79dc6d8c"`);
        await queryRunner.query(`DROP TABLE "state_rates_rate"`);
    }

}

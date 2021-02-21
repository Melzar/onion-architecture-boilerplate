import {MigrationInterface, QueryRunner} from "typeorm";

export class createWarehouseItem1613939666376 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "warehouse_item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cost" numeric(15,2) NOT NULL, "warehouseId" integer, "equipmentId" integer, CONSTRAINT "REL_b80de85d800854755dcae18a8d" UNIQUE ("equipmentId"), CONSTRAINT "PK_9db3c002318afa54d84094100b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "warehouse_item" ADD CONSTRAINT "FK_d09a54d4ec841657b62ccbb4776" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse_item" ADD CONSTRAINT "FK_b80de85d800854755dcae18a8d1" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse_item" DROP CONSTRAINT "FK_b80de85d800854755dcae18a8d1"`);
        await queryRunner.query(`ALTER TABLE "warehouse_item" DROP CONSTRAINT "FK_d09a54d4ec841657b62ccbb4776"`);
        await queryRunner.query(`DROP TABLE "warehouse_item"`);
    }

}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1559074176400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'User',
      columns: [
        {
          name: 'id',
          type: 'int', // TODO CAN BE MOVED TO SOME KIND OF ENUM
          isPrimary: true,
        },
        {
          name: 'first_name',
          type: 'varchar',
        },
        {
          name: 'last_name',
          type: 'varchar',
        },
        {
          name: 'age',
          type: 'int',
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('User');
  }
}

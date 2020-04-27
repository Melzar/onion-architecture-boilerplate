import { Connection, createConnection } from 'typeorm';
import { setConnection } from 'typeorm-seeding';

import 'infrastructure/database/fixtures/factories/RoleFactory';
import 'infrastructure/database/fixtures/factories/UserFactory';
import 'infrastructure/database/fixtures/factories/EquipmentFactory';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { prepareTestTransaction } from 'config/helpers/prepareTestTransaction';
import { getPostgresConnection } from 'config/helpers/getPostgresConnection';
import { getCurrentConnection } from 'config/helpers/getCurrentConnection';

prepareTestTransaction();

export const prepareTestDB = async (testName?: string): Promise<Connection> => {
  const connection = await getCurrentConnection();

  const options = connection.options as PostgresConnectionOptions;

  const db = await getPostgresConnection(
    connection.options as PostgresConnectionOptions
  );

  await db.none('CREATE DATABASE $1:name', testName);
  db.$pool.end();

  const dbConnecton = await createConnection({
    ...options,
    name: testName,
    database: testName,
  });

  await dbConnecton.dropDatabase();
  await dbConnecton.runMigrations();
  setConnection(dbConnecton);
  return dbConnecton;
};

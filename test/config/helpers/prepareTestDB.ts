import { Connection, getConnection } from 'typeorm';
import { setConnection } from 'typeorm-seeding';

import 'infrastructure/db/fixtures/factories/RoleFactory';
import 'infrastructure/db/fixtures/factories/UserFactory';

export const prepareTestDB = async (): Promise<Connection> => {
  const connection: Connection = getConnection(process.env.ORM_CONNECTION);
  await connection.dropDatabase();
  await connection.runMigrations();
  setConnection(connection);
  return connection;
};

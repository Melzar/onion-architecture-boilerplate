import { getConnection } from 'typeorm';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { getPostgresConnection } from 'config/helpers/getPostgresConnection';

import { getCurrentConnection } from 'config/helpers/getCurrentConnection';

export const clearTestDB = async (testName?: string): Promise<void> => {
  const connection = await getCurrentConnection();

  getConnection(testName).close();

  const db = await getPostgresConnection(
    connection.options as PostgresConnectionOptions
  );

  // db.$pool.end();

  await db.none('DROP DATABASE $1:name', testName);
};

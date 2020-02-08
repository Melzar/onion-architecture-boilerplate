import pgPromise, { IDatabase } from 'pg-promise';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const getPostgresConnection = ({
  database,
  port,
  username,
  password,
}: PostgresConnectionOptions): IDatabase<{}> => {
  const pgp = pgPromise();

  return pgp({
    database,
    port,
    user: username,
    password,
  });
};

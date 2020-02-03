import { join } from 'path';

import * as yargs from 'yargs';

import { Connection, createConnection, ConnectionOptions } from 'typeorm';

const {
  type,
  host,
  port,
  username,
  password,
  database,
  logging,
  migrations,
  // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
} = require(join(process.cwd(), 'ormconfig.js'))[0];

yargs
  .command({
    command: 'reload',
    describe: 'Reload Database',
    handler: () => {
      try {
        const connectionOptions: ConnectionOptions = {
          database,
          host,
          logging,
          migrations,
          password,
          port,
          type,
          username,
        };
        createConnection(connectionOptions).then(
          async (connection: Connection) => {
            await connection.dropDatabase();
            await connection.runMigrations();
            process.exit(0);
          }
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error when reloading database', error);
        process.exit(1);
      }
    },
  })
  .parse();

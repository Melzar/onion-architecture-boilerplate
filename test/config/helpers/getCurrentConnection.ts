import {
  Connection,
  createConnection,
  getConnection,
  getConnectionManager,
} from 'typeorm';

export const getCurrentConnection = async (): Promise<Connection> => {
  if (!getConnectionManager().has(process.env.ORM_CONNECTION || '')) {
    await createConnection(process.env.ORM_CONNECTION || '');
  }
  return getConnection(process.env.ORM_CONNECTION);
};

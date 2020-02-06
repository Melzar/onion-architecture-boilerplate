import { injectable } from 'inversify';
import { createConnection } from 'typeorm';

import { IOrm } from 'infrastructure/db/orm/IOrm';

@injectable()
export class OnionOrm implements IOrm {
  public async initialize(): Promise<void> {
    await createConnection(process.env.ORM_CONNECTION || '');
  }
}

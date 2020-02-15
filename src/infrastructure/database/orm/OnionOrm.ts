import { injectable } from 'inversify';
import { createConnection } from 'typeorm';

import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

import { IOrm } from 'infrastructure/database/orm/IOrm';

@injectable()
export class OnionOrm implements IOrm {
  public async initialize(): Promise<void> {
    await createConnection(process.env.ORM_CONNECTION || '');

    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
  }
}

import {
  IsolationLevel,
  Propagation,
  Transactional,
} from 'typeorm-transactional-cls-hooked';

import { RollbackException } from 'config/db/RollbackException';

import { RunFunction } from 'config/types/RunFunction';

export class TransactionCreator {
  @Transactional({
    connectionName: process.env.ORM_CONNECTION,
    propagation: Propagation.REQUIRES_NEW,
    isolationLevel: IsolationLevel.SERIALIZABLE,
  })
  static async run(func: RunFunction) {
    await func();
    throw new RollbackException(`Transaction rollback`);
  }
}

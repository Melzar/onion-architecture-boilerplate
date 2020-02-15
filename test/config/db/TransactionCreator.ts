import {
  IsolationLevel,
  Propagation,
  Transactional,
} from 'typeorm-transactional-cls-hooked';

import { RollbackException } from 'config/db/RollbackException';

import { RunFunction } from 'config/types/RunFunction';

export const TransactionConnectionName = {
  connectionName: (): string => process.env.ORM_CONNECTION || '',
};

export class TransactionCreator {
  @Transactional({
    connectionName: TransactionConnectionName.connectionName,
    propagation: Propagation.NESTED,
    isolationLevel: IsolationLevel.SERIALIZABLE,
  })
  static async run(func: RunFunction) {
    await func();
    throw new RollbackException(`Transaction rollback`);
  }
}

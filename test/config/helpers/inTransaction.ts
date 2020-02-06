import { RollbackException } from 'config/db/RollbackException';
import { RunFunction } from 'config/types/RunFunction';
import { TransactionCreator } from 'config/db/TransactionCreator';

export const inTransaction = (func: RunFunction) => {
  return async () => {
    try {
      await TransactionCreator.run(func);
    } catch (e) {
      if (e instanceof RollbackException) {
      } else {
        throw e;
      }
    }
  };
};

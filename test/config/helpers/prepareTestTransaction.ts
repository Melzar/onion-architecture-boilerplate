import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

export const prepareTestTransaction = () => {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();
};

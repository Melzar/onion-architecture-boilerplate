import {
  EntityManager,
  getRepository,
  EntitySchema,
  ObjectType,
} from 'typeorm';

export abstract class UnitOfWork {
  protected getConnectionName(): string | undefined {
    return process.env.ORM_CONNECTION;
  }

  /**
   * @description Had to do it that way due to limitation of Transaction library
   * it doesn't patch getManager and similar helpers from typeOrm - only Repository
   * @param entityClass - class of any Entity to get repository and it's manager,
   * doesn't really matter what kind of entity, for consistency provide same entity as operation
   * requires
   */
  protected getManager<T>(
    entityClass: ObjectType<T> | EntitySchema<T> | string
  ): EntityManager {
    return getRepository(entityClass, this.getConnectionName()).manager;
  }
}

import { AbstractRepository, getRepository } from 'typeorm';
import { injectable } from 'inversify';

import { ObjectType } from 'typeorm/common/ObjectType';

import { Repository as ORMRepository } from 'typeorm/repository/Repository';

import { IRepository } from 'infrastructure/database/repository/common/IRepository';
import { Query } from 'infrastructure/database/repository/common/Query';

@injectable()
export abstract class Repository<E> extends AbstractRepository<E>
  implements IRepository<E, ORMRepository<E>> {
  protected constructor(protected readonly entity: ObjectType<E>) {
    super();
  }

  public async find(id: string): Promise<E | undefined> {
    return this.getDBRepository().findOne(id);
  }

  public findBy(condition: Query<E>): Promise<E[]> {
    return this.getDBRepository().find(condition);
  }

  public async findMany(ids: string[]): Promise<E[]> {
    return this.getDBRepository().findByIds(ids);
  }

  public async findAll(): Promise<E[]> {
    return this.getDBRepository().find();
  }

  public async query(query: string, parameters?: any[]): Promise<E[]> {
    return this.getDBRepository().query(query, parameters);
  }

  public async update(condition: string | number, data: E): Promise<boolean> {
    return !!(await this.getDBRepository().update(condition, data));
  }

  public async updateAll(
    condition: string[] | number[],
    data: E
  ): Promise<boolean> {
    return !!(await this.getDBRepository().update(condition, data));
  }

  public async delete(condition: string | number): Promise<boolean> {
    return !!(await this.getDBRepository().delete(condition));
  }

  public async deleteAll(condition: string[] | number[]): Promise<boolean> {
    return !!(await this.getDBRepository().delete(condition));
  }

  public async remove(entity: E): Promise<E> {
    return this.getDBRepository().remove(entity);
  }

  public async removeAll(entities: E[]): Promise<E[]> {
    return this.getDBRepository().remove(entities);
  }

  public async save(entity: E): Promise<E> {
    return this.getDBRepository().save(entity);
  }

  public async saveAll(entities: E[]): Promise<E[]> {
    return this.getDBRepository().save(entities);
  }

  public custom(): ORMRepository<E> {
    return this.getDBRepository();
  }

  protected getConnectionName(): string | undefined {
    return process.env.ORM_CONNECTION;
  }

  private getDBRepository(): ORMRepository<E> {
    return getRepository<E>(this.entity, this.getConnectionName());
  }
}

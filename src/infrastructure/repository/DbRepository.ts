import { AbstractRepository, getRepository } from 'typeorm';
import { injectable } from 'inversify';

import { ObjectType } from 'typeorm/common/ObjectType';

import { Repository } from 'typeorm/repository/Repository';

import { IRepository } from 'infrastructure/repository/common/IRepository';
import { Query } from 'infrastructure/repository/common/Query';

@injectable()
export abstract class DbRepository<E> extends AbstractRepository<E>
  implements IRepository<E, Repository<E>> {
  protected constructor(protected readonly entity: ObjectType<E>) {
    super();
  }

  public async find(id: string): Promise<E | undefined> {
    return getRepository(this.entity).findOne(id);
  }

  public findBy(condition: Query<E>): Promise<E[]> {
    return getRepository(this.entity).find(condition);
  }

  public async findMany(ids: string[]): Promise<E[]> {
    return getRepository(this.entity).findByIds(ids);
  }

  public async findAll(): Promise<E[]> {
    return getRepository(this.entity).find();
  }

  public async query(query: string, parameters?: any[]): Promise<E[]> {
    return getRepository(this.entity).query(query, parameters);
  }

  public async update(condition: string | number, data: E): Promise<boolean> {
    return !!(await getRepository(this.entity).update(condition, data));
  }

  public async updateAll(
    condition: string[] | number[],
    data: E
  ): Promise<boolean> {
    return !!(await getRepository(this.entity).update(condition, data));
  }

  public async delete(condition: string | number): Promise<boolean> {
    return !!(await getRepository(this.entity).delete(condition));
  }

  public async deleteAll(condition: string[] | number[]): Promise<boolean> {
    return !!(await getRepository(this.entity).delete(condition));
  }

  public async remove(entity: E): Promise<boolean> {
    return !!(await getRepository(this.entity).remove(entity));
  }

  public async removeAll(entities: E[]): Promise<boolean> {
    return !!(await getRepository(this.entity).remove(entities));
  }

  public async save(entity: E): Promise<boolean> {
    return !!(await getRepository(this.entity).save(entity));
  }

  public async saveAll(entities: E[]): Promise<boolean> {
    return !!(await getRepository(this.entity).save(entities));
  }

  public custom(): Repository<E> {
    return getRepository<E>(this.entity);
  }
}

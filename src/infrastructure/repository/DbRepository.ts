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

  public async remove(entity: E): Promise<boolean> {
    return !!(await this.getDBRepository().remove(entity));
  }

  public async removeAll(entities: E[]): Promise<boolean> {
    return !!(await this.getDBRepository().remove(entities));
  }

  public async save(entity: E): Promise<boolean> {
    return !!(await this.getDBRepository().save(entity));
  }

  public async saveAll(entities: E[]): Promise<boolean> {
    return !!(await this.getDBRepository().save(entities));
  }

  public custom(): Repository<E> {
    return this.getDBRepository();
  }

  private getDBRepository(): Repository<E> {
    return getRepository<E>(this.entity, process.env.ORM_CONNECTION);
  }
}

import { AbstractRepository } from 'typeorm';
import { injectable } from 'inversify';

import { IRepository } from 'infrastructure/repository/common/IRepository';
import { Query } from 'infrastructure/repository/common/Query';

@injectable()
export abstract class DbRepository<E> extends AbstractRepository<E> implements IRepository<E> {
  public async find(id: string): Promise<E | undefined> {
    return this.repository.findOne(id);
  }

  public findBy(condition: Query<E>): Promise<E[]> {
    return this.repository.find(condition);
  }

  public async findMany(ids: string[]): Promise<E[]> {
    return this.repository.findByIds(ids);
  }

  public async findAll(): Promise<E[]> {
    return this.repository.find();
  }

  public async query(query: string, parameters?: any[]): Promise<E[]> {
    return this.repository.query(query, parameters);
  }

  public async update(condition: string | number, data: E): Promise<boolean> {
    return !!await this.repository.update(condition, data);
  }

  public async updateAll(condition: string[] | number[], data: E): Promise<boolean> {
    return !!await this.repository.update(condition, data);
  }

  public async delete(condition: string | number): Promise<boolean> {
    return !!await this.repository.delete(condition);
  }

  public async deleteAll(condition: string[] | number[]): Promise<boolean> {
    return !!await this.repository.delete(condition);
  }

  public async remove(entity: E): Promise<boolean> {
    return !!await this.repository.remove(entity);
  }

  public async removeAll(entities: E[]): Promise<boolean> {
    return !!await this.repository.remove(entities);
  }

  public async save(entity: E): Promise<boolean> {
    return !!await this.repository.save(entity);
  }

  public async saveAll(entities: E[]): Promise<boolean> {
    return !!await this.repository.save(entities);
  }
}

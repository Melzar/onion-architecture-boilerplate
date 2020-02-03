import { Query } from 'infrastructure/repository/common/Query';

export interface IRepository<E, R> {
  custom(): R;
  delete(
    condition: string | number | { [key: string]: string | number } | E
  ): Promise<boolean>;
  deleteAll(condition: string[] | number[] | E[]): Promise<boolean>;
  find(id: string): Promise<E | undefined>;
  findAll(): Promise<E[]>;
  findBy(condition: Query<E>): Promise<E[]>;
  findMany(ids: string[]): Promise<E[]>;
  query(query: string, parameters?: any[]): Promise<E[]>;
  remove(entity: E): Promise<boolean>;
  removeAll(entities: E[]): Promise<boolean>;
  save(entity: E): Promise<boolean>;
  saveAll(entities: E[]): Promise<boolean>;
  update(condition: string | number, data: E): Promise<boolean>;
  updateAll(condition: string[] | number[], data: E): Promise<boolean>;
}

import { Query } from 'infrastructure/repository/common/Query';

export interface IRepository<E> {
    find(id: string): Promise<E | undefined>;
    findBy(condition: Query<E>): Promise<E[]>;
    findMany(ids: string[]): Promise<E[]>;
    findAll(): Promise<E[]>;
    query(query: string, parameters?: any[]): Promise<E[]>;
    update(condition: string | number, data: E): Promise<boolean>;
    updateAll(condition: string[] | number[], data: E): Promise<boolean>;
    delete(condition: string | number | {[key: string]: string | number } | E): Promise<boolean>;
    deleteAll(condition: string[] | number[] | E[]): Promise<boolean>;
    remove(entity: E): Promise<boolean>;
    removeAll(entities: E[]): Promise<boolean>;
    save(entity: E): Promise<boolean>;
    saveAll(entities: E[]): Promise<boolean>;
}

import { Warehouse } from 'core/domain/Warehouse/Warehouse';

export interface IWarehouseRepository {
  getAvailableWarehouses(): Promise<Warehouse[]>;
}

import { Warehouse } from 'core/domain/Warehouse/Warehouse';

export interface IWarehouseService {
  fetchAvailableWarehouses(): Promise<Warehouse[]>;
}

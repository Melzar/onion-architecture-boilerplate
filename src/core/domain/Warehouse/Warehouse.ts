import { State } from 'core/domain/State/State';
import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';

export class Warehouse {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly state: State,
    public readonly warehouseItems: WarehouseItem[]
  ) {}
}

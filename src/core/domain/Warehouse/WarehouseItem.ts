import { Equipment } from 'core/domain/Equipment/Equipment';
import { Warehouse } from 'core/domain/Warehouse/Warehouse';

export class WarehouseItem {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly cost: number,
    public readonly warehouse: Warehouse,
    public readonly equipment: Equipment
  ) {}
}

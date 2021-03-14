import { State } from 'core/domain/State/State';
import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';

export class Warehouse {
  constructor(
    public readonly id: number,
    public readonly widthCost: number,
    public readonly heightCost: number,
    public readonly depthCost: number,
    public readonly capacityWidth: number,
    public readonly capacityHeight: number,
    public readonly capacityDepth: number,
    public readonly capacityWidthLoad: number,
    public readonly capacityHeightLoad: number,
    public readonly capacityDepthLoad: number,
    public readonly available: boolean,
    public readonly name: string,
    public readonly state: State,
    public readonly warehouseItems: WarehouseItem[]
  ) {}
}

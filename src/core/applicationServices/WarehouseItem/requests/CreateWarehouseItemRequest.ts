export class CreateWarehouseItemRequest {
  constructor(
    public readonly name: string,
    public readonly cost: number,
    public readonly warehouseID: number,
    public readonly equipmentID: number
  ) {}
}

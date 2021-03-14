export class CreateWarehouseItemRequest {
  constructor(
    public readonly name: string,
    public readonly warehouseID: number,
    public readonly equipmentID: number,
    public readonly cost?: number
  ) {}
}

export class AddWarehouseItemRepositoryRequest {
  constructor(
    public readonly equipmentID: number,
    public readonly warehouseID: number,
    public readonly cost: number,
    public readonly name?: string
  ) {}
}

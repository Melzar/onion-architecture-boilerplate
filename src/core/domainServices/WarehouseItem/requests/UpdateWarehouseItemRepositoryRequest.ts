export class UpdateWarehouseItemRepositoryRequest {
  constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly cost?: number,
    public readonly warehouseID?: number,
    public readonly equipmentID?: number
  ) {}
}

export class UpdateWarehouseRepositoryRequest {
  constructor(
    public readonly warehouseID: number,
    public readonly stateID?: number,
    public readonly name?: string
  ) {}
}

export class CalculateUserEquipmentCostRequest {
  constructor(
    public readonly equipmentId: number,
    public readonly warehouseId: number,
    public readonly userId: number
  ) {}
}

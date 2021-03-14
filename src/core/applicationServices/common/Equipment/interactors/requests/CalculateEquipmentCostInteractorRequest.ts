export class CalculateEquipmentCostInteractorRequest {
  constructor(
    public readonly warehouseId: number,
    public readonly equipmentId: number
  ) {}
}

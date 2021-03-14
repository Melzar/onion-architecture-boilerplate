export class GetUserEquipmentRepositoryRequest {
  constructor(
    public readonly userId: number,
    public readonly equipmentId: number
  ) {}
}

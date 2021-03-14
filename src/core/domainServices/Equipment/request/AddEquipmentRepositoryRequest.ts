export class AddEquipmentRepositoryRequest {
  constructor(
    public readonly name: string,
    public readonly width: number,
    public readonly height: number,
    public readonly depth: number,
    public readonly userId: number
  ) {}
}

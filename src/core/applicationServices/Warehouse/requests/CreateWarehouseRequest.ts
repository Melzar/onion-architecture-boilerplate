export class CreateWarehouseRequest {
  constructor(public readonly name: string, public readonly stateID?: number) {}
}

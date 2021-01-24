import { EquipmentStateRate } from 'core/domain/Equipment/EquipmentStateRate';

export class Equipment {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly equipmentStateRates: EquipmentStateRate[]
  ) {}
}

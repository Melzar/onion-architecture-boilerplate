import { State } from 'core/domain/State/State';
import { Rate } from 'core/domain/Rate/Rate';
import { Equipment } from 'core/domain/Equipment/Equipment';

export class EquipmentStateRate {
  constructor(
    public readonly equipment: Equipment,
    public readonly state: State,
    public readonly rate: Rate
  ) {}
}

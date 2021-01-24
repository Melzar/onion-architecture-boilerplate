import { Rate } from 'core/domain/Rate/Rate';
import { Equipment } from 'core/domain/Equipment/Equipment';

export class State {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly rates: Rate[],
    public readonly equipments: Equipment[]
  ) {}
}

import { Rate } from 'core/domain/Rate/Rate';
import { Warehouse } from 'core/domain/Warehouse/Warehouse';

export class State {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly rates: Rate[],
    public readonly warehouses: Warehouse[]
  ) {}
}

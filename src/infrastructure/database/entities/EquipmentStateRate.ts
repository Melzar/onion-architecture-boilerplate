import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { State } from 'infrastructure/database/entities/State';
import { Equipment } from 'infrastructure/database/entities/Equipment';
import { Rate } from 'infrastructure/database/entities/Rate';

@Entity()
export class EquipmentStateRate {
  @PrimaryColumn({ type: 'int', name: 'stateId' })
  @ManyToOne(
    () => State,
    state => state.id
  )
  @JoinColumn()
  state!: State;

  @PrimaryColumn({ type: 'int', name: 'equipmentId' })
  @ManyToOne(
    () => Equipment,
    equipment => equipment.id
  )
  @JoinColumn()
  equipment!: Equipment;

  @PrimaryColumn({ type: 'int', name: 'rateId' })
  @ManyToOne(
    () => Rate,
    rate => rate.id
  )
  @JoinColumn()
  rate!: Rate;
}

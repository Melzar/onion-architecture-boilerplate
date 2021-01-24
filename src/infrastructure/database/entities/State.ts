import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';

import { Rate } from 'infrastructure/database/entities/Rate';
import { EquipmentStateRate } from 'infrastructure/database/entities/EquipmentStateRate';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(
    () => Rate,
    rate => rate.states
  )
  @JoinTable()
  rates!: Rate[];

  @OneToMany(
    () => EquipmentStateRate,
    equipmentStateRate => equipmentStateRate.equipment
  )
  equipments!: EquipmentStateRate[];
}

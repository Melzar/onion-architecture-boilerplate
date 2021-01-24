import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'infrastructure/database/entities/User';
import { EquipmentStateRate } from 'infrastructure/database/entities/EquipmentStateRate';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(
    () => User,
    user => user.equipment
  )
  user!: User;

  @OneToMany(
    () => EquipmentStateRate,
    equipmentStateRate => equipmentStateRate.state
  )
  states!: EquipmentStateRate[];
}

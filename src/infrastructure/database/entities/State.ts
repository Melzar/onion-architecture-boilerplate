import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';

import { Rate } from 'infrastructure/database/entities/Rate';
import { Warehouse } from 'infrastructure/database/entities/Warehouse';

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
    () => Warehouse,
    warehouse => warehouse.state
  )
  warehouses!: Warehouse[];
}

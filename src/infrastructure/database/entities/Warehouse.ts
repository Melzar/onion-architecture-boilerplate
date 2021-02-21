import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { State } from 'infrastructure/database/entities/State';
import { WarehouseItem } from 'infrastructure/database/entities/WarehouseItem';

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(
    () => WarehouseItem,
    warehouseItem => warehouseItem.warehouse
  )
  warehouseItems!: WarehouseItem[];

  @ManyToOne(
    () => State,
    state => state.warehouses
  )
  state!: State;
}

import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'infrastructure/database/entities/User';
import { WarehouseItem } from 'infrastructure/database/entities/WarehouseItem';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  width!: number;

  @Column()
  height!: number;

  @Column()
  depth!: number;

  @ManyToOne(
    () => User,
    user => user.equipment
  )
  user!: User;

  @OneToOne(
    () => WarehouseItem,
    warehouseItem => warehouseItem.equipment
  )
  warehouseItem!: WarehouseItem;
}

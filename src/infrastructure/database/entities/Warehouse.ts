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

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  widthCost!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  heightCost!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  depthCost!: number;

  @Column({ default: false })
  available!: boolean;

  @Column()
  capacityWidth!: number;

  @Column()
  capacityHeight!: number;

  @Column()
  capacityDepth!: number;

  @Column({ default: 0 })
  capacityWidthLoad!: number;

  @Column({ default: 0 })
  capacityHeightLoad!: number;

  @Column({ default: 0 })
  capacityDepthLoad!: number;

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

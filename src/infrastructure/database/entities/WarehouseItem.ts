import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Equipment } from 'infrastructure/database/entities/Equipment';
import { Warehouse } from 'infrastructure/database/entities/Warehouse';

@Entity()
export class WarehouseItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  cost!: number;

  @ManyToOne(
    () => Warehouse,
    warehouse => warehouse.warehouseItems
  )
  warehouse!: Warehouse;

  @OneToOne(() => Equipment)
  @JoinColumn()
  equipment!: Equipment;
}

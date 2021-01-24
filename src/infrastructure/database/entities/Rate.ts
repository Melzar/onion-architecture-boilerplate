import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { State } from 'infrastructure/database/entities/State';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'decimal', precision: 3, scale: 1 })
  value!: number;

  @ManyToMany(
    () => State,
    state => state.rates
  )
  states!: State[];
}

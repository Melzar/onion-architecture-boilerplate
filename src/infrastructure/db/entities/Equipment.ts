import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'infrastructure/db/entities/User';

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
}

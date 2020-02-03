import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Role } from 'infrastructure/db/entities/Role';
import { Equipment } from 'infrastructure/db/entities/Equipment';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @ManyToOne(
    () => Role,
    role => role.user
  )
  role!: Role;

  @OneToMany(
    () => Equipment,
    equipment => equipment.user
  )
  equipment!: Equipment;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Role } from 'infrastructure/db/entities/Role';

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
}

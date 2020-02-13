import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'infrastructure/database/entities/User';
import { USER_ROLE } from 'infrastructure/database/enum/UserRole';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    default: USER_ROLE.MEMBER,
    enum: USER_ROLE,
    nullable: false,
    type: 'enum',
  })
  name!: string;

  @OneToMany(
    () => User,
    user => user.role
  )
  user!: User;
}

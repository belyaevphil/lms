import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'

import { Role } from './roles.entity'
import { User } from './users.entity'

@Entity({ name: 'users_roles' })
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => User,
    user => user.usersRoles
  )
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(
    () => Role,
    role => role.usersRoles
  )
  @JoinColumn({ name: 'role_id' })
  role: Role
}

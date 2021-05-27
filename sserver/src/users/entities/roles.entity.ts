import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { UserRole } from './users-roles.entity'

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(
    () => UserRole,
    userRole => userRole.role
  )
  usersRoles: UserRole[]
}

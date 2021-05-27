import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

import { StudentCourse } from 'src/courses/entities/students-courses.entity'
import { Instructor } from './instructors.entity'
import { UserRole } from './users-roles.entity'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name' })
  lastName: string

  @Column({ default: null })
  email: string

  @Column({ default: null })
  phone: string

  @OneToMany(
    () => StudentCourse,
    studentCourse => studentCourse.user
  )
  studentsCourses: StudentCourse[]

  @OneToMany(
    () => UserRole,
    userRole => userRole.user
  )
  usersRoles: UserRole[]

  @OneToMany(
    () => Instructor,
    instructor => instructor.user
  )
  instructors: Instructor[]
}

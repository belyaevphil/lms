import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'

import { User } from 'src/users/entities/users.entity'
import { Course } from 'src/courses/entities/courses.entity'

@Entity({ name: 'instructors' })
export class Instructor {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => User,
    user => user.instructors
  )
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(
    () => Course,
    course => course.instructors
  )
  @JoinColumn({ name: 'course_id' })
  course: Course
}

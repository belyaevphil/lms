import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm'

import { StudentLesson } from 'src/lessons/entities/students-lessons.entity'
import { User } from 'src/users/entities/users.entity'
import { Course } from './courses.entity'

@Entity({ name: 'students_courses' })
export class StudentCourse {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => User,
    user => user.studentsCourses
  )
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(
    () => Course,
    course => course.studentsCourses
  )
  @JoinColumn({ name: 'course_id' })
  course: Course

  @OneToMany(
    () => StudentLesson,
    studentLesson => studentLesson.studentCourse
  )
  studentsLessons: StudentLesson[]
}

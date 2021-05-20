import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import { StudentCourse } from 'src/courses/entities/students-courses.entity'
import { Lesson } from './lessons.entity'

@Entity({ name: 'students_lessons' })
export class StudentLesson {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  answer: string

  @Column()
  status: string

  @Column()
  grade: number

  @ManyToOne(
    () => StudentCourse,
    studentCourse => studentCourse.studentsLessons
  )
  @JoinColumn({ name: 'student_course_id' })
  studentCourse: StudentCourse

  @ManyToOne(
    () => Lesson,
    lesson => lesson.studentsLessons
  )
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson
}

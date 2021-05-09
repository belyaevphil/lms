import { Lesson } from 'src/lessons/entities/lessons.entity'
import { Instructor } from 'src/users/entities/instructors.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { StudentCourse } from './students-courses.entity'

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true, default: null })
  description: string

  @OneToMany(
    () => StudentCourse,
    studentCourse => studentCourse.course
  )
  studentsCourses: StudentCourse[]

  @OneToMany(
    () => Lesson,
    lesson => lesson.course
  )
  lessons: Lesson[]

  @OneToMany(
    () => Instructor,
    instructor => instructor.course
  )
  instructors: Instructor[]
}

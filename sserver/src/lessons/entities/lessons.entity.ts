import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm'

import { Course } from 'src/courses/entities/courses.entity'
import { LessonFile } from './lessons-files.entity'
import { StudentLesson } from './students-lessons.entity'

@Entity({ name: 'lessons' })
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @ManyToOne(
    () => Course,
    course => course.lessons
  )
  @JoinColumn({ name: 'course_id' })
  course: Course

  @OneToMany(
    () => LessonFile,
    lessonFile => lessonFile.lesson
  )
  lessonsFiles: LessonFile[]

  @OneToMany(
    () => StudentLesson,
    studentLesson => studentLesson.lesson
  )
  studentsLessons: StudentLesson[]
}

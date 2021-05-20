import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { Lesson } from './lessons.entity'

@Entity({ name: 'lessons_files' })
export class LessonFile {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'original_name' })
  originalName: string

  @Column()
  path: string

  @ManyToOne(
    () => Lesson,
    lesson => lesson.lessonsFiles
  )
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson
}

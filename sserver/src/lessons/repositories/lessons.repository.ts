import { EntityRepository, Repository, getConnection } from 'typeorm'

import { Lesson } from '../entities/lessons.entity'
import { StudentCourse } from 'src/courses/entities/students-courses.entity'
import { StudentLesson } from '../entities/students-lessons.entity'
import { LessonFile } from '../entities/lessons-files.entity'

@EntityRepository(Lesson)
export class LessonsRepository extends Repository<Lesson> {
  async createOne(data: {
    name: string
    courseId: number
    description: string
    files: Express.Multer.File[]
  }) {
    await getConnection().transaction(async transactionalEntityManager => {
      const newLesson = await transactionalEntityManager
        .getRepository(Lesson)
        .save({
          name: data.name,
          course: { id: data.courseId },
          description: data.description
        })

      const studentsCourses = await transactionalEntityManager
        .getRepository(StudentCourse)
        .createQueryBuilder('sc')
        .innerJoin('sc.course', 'c')
        .innerJoinAndSelect('sc.user', 'u')
        .where('sc.course_id = :courseId', { courseId: data.courseId })
        .getMany()

      if (studentsCourses.length) {
        const studentsLessons = studentsCourses.map(studentCourse => {
          return {
            user: { id: studentCourse.user.id },
            studentCourse: { id: studentCourse.id },
            lesson: { id: newLesson.id }
          }
        })
        await transactionalEntityManager
          .getRepository(StudentLesson)
          .insert(studentsLessons)
      }

      if (data.files.length) {
        const lessonFiles = data.files.map(file => {
          return {
            lesson: { id: newLesson.id },
            originalName: file.originalname,
            path: file.path
          }
        })
        await transactionalEntityManager
          .getRepository(LessonFile)
          .insert(lessonFiles)
      }
    })
  }
}

import { EntityRepository, Repository } from 'typeorm'

import { StudentLesson } from '../entities/students-lessons.entity'

@EntityRepository(StudentLesson)
export class StudentsLessonsRepository extends Repository<StudentLesson> {
  async findOneByUserAndLessonIds(options: {
    where: {
      userId: number
      lessonId: number
    }
  }) {
    return this.createQueryBuilder('sl')
      .leftJoinAndSelect('sl.lesson', 'l')
      .leftJoinAndSelect('sl.studentCourse', 'sc')
      .leftJoinAndSelect('l.lessonsFiles', 'lf')
      .where('sc.user_id = :userId', { userId: options.where.userId })
      .andWhere('sl.id = :lessonId', {
        lessonId: options.where.lessonId
      })
      .getOne()
  }

  async findManyToGradeByInstructorId(options: {
    where: {
      userId: number
    }
  }) {
    return this.createQueryBuilder('sl')
      .innerJoinAndSelect('sl.lesson', 'l')
      .innerJoinAndSelect('sl.studentCourse', 'sc')
      .innerJoinAndSelect('sc.course', 'c')
      .innerJoinAndSelect('c.instructors', 'i')
      .where('i.user_id = :userId', { userId: options.where.userId })
      .andWhere('sl.status = "ожидается проверка"')
      .getMany()
  }
}

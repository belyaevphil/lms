import { EntityRepository, Repository } from 'typeorm'

import { StudentCourse } from '../entities/students-courses.entity'

@EntityRepository(StudentCourse)
export class StudentsCoursesRepository extends Repository<StudentCourse> {
  async findByUserId(options: {
    where: {
      userId: number
    }
    skip?: number
    take?: number
  }) {
    return this.createQueryBuilder('sc')
      .innerJoinAndSelect('sc.course', 'c')
      .where('sc.user_id = :userId', { userId: options.where.userId })
      .skip(options.skip)
      .take(options.take > 20 ? 20 : options.take)
      .getMany()
  }

  async findOneWithLessons(options: {
    where: {
      courseId: number
      userId: number
    }
  }) {
    return this.createQueryBuilder('sc')
      .innerJoinAndSelect('sc.course', 'c')
      .innerJoinAndSelect('sc.studentsLessons', 'sl')
      .innerJoinAndSelect('sl.lesson', 'l')
      .where('sc.user_id = :userId', { userId: options.where.userId })
      .andWhere('sc.id = :courseId', {
        courseId: options.where.courseId
      })
      .getOne()
  }

  async findManyByUserId(options: {
    where: {
      userId: number
    }
    skip?: number
    take?: number
  }) {
    return this.createQueryBuilder('sc')
      .innerJoinAndSelect('sc.course', 'c')
      .innerJoinAndSelect('sc.studentsLessons', 'sl')
      .where('sc.user_id = :userId', { userId: options.where.userId })
      .skip(options.skip)
      .take(options.take > 20 ? 20 : options.take)
      .getMany()
  }
}

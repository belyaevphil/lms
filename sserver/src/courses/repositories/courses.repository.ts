import { EntityRepository, Repository } from 'typeorm'

import { Course } from '../entities'

@EntityRepository(Course)
export class CoursesRepository extends Repository<Course> {
  async findManyByInstructorId(options: {
    where: {
      userId: number
    }
    skip?: number
    take?: number
  }) {
    return this.createQueryBuilder('c')
      .innerJoinAndSelect('c.instructors', 'i')
      .where('i.user_id = :userId', { userId: options.where.userId })
      .skip(options.skip)
      .take(options.take > 20 ? 20 : options.take)
      .getMany()
  }

  async findOneWithLessonsByInstructorId(options: {
    where: {
      courseId: number
    }
  }) {
    return this.createQueryBuilder('c')
      .leftJoinAndSelect('c.lessons', 'l')
      .where('c.id = :courseId', { courseId: options.where.courseId })
      .getOne()
  }
}

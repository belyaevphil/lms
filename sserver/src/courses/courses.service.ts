import {
  Injectable,
  BadRequestException,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { StudentsCoursesRepository } from './repositories'
import { StudentsLessonsRepository } from 'src/lessons/repositories'
import { CreateCourseDto, AssignCourseDto, AssignInstructorDto } from './dto'
import { CoursesRepository } from './repositories'
import {
  InstructorsRepository,
  UsersRepository,
  UsersRolesRepository
} from 'src/users/repositories'

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(StudentsCoursesRepository)
    private readonly studentsCoursesRepository: StudentsCoursesRepository,
    @InjectRepository(CoursesRepository)
    private readonly coursesRepository: CoursesRepository,
    @InjectRepository(StudentsLessonsRepository)
    private readonly studentsLessonsRepository: StudentsLessonsRepository,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @InjectRepository(InstructorsRepository)
    private readonly instructorsRepository: InstructorsRepository,
    @InjectRepository(UsersRolesRepository)
    private readonly usersRolesRepository: UsersRolesRepository
  ) {}

  async getOneById(data: { courseId: number; userId: number }) {
    const { courseId, userId } = data

    const studentCourse = await this.studentsCoursesRepository.findOneWithLessons(
      {
        where: {
          courseId,
          userId
        }
      }
    )
    if (!studentCourse) {
      throw new BadRequestException('Курс недоступен')
    }

    const courseData = {
      name: studentCourse.course.name,
      description: studentCourse.course.description,
      completedLessonsCount: studentCourse.studentsLessons.filter(
        studentLesson => studentLesson.status === 'выполнено'
      ).length,
      lessonsCount: studentCourse.studentsLessons.length,
      averageGrade:
        studentCourse.studentsLessons.reduce(
          (acc, studentLesson) => acc + studentLesson.grade,
          0
        ) /
        studentCourse.studentsLessons.filter(
          studentLesson => studentLesson.grade
        ).length,
      lessons: studentCourse.studentsLessons.map(studentLesson => {
        return {
          id: studentLesson.id,
          name: studentLesson.lesson.name,
          description: studentLesson.lesson.description,
          grade: studentLesson.grade,
          status: studentLesson.status
        }
      })
    }

    return courseData
  }

  async getInstructorCourse(data: { courseId: number }) {
    const { courseId } = data

    const instructorCourse = await this.coursesRepository.findOneWithLessonsByInstructorId(
      {
        where: {
          courseId
        }
      }
    )

    return {
      name: instructorCourse.name,
      description: instructorCourse.description,
      lessons: instructorCourse.lessons
    }
  }

  async getManyByUserId(data: { userId: number }) {
    const studentCourses = await this.studentsCoursesRepository.findManyByUserId(
      {
        where: { userId: data.userId }
      }
    )

    const studentCoursesData = studentCourses.map(studentCourse => {
      return {
        id: studentCourse.id,
        name: studentCourse.course.name,
        description: studentCourse.course.description,
        completedLessonsCount: studentCourse.studentsLessons.filter(
          studentLesson => studentLesson.status === 'выполнено'
        ).length,
        lessonsCount: studentCourse.studentsLessons.length,
        averageGrade:
          studentCourse.studentsLessons.reduce(
            (acc, studentLesson) => acc + studentLesson.grade,
            0
          ) /
          studentCourse.studentsLessons.filter(
            studentLesson => studentLesson.grade
          ).length
      }
    })

    return studentCoursesData
  }

  async getInstructorCourses(data: { userId: number }) {
    const instructorCourses = await this.coursesRepository.findManyByInstructorId(
      {
        where: { userId: data.userId }
      }
    )

    const instructorCoursesData = instructorCourses.map(instructorCourse => {
      return {
        id: instructorCourse.id,
        name: instructorCourse.name
      }
    })

    return instructorCoursesData
  }

  async create(data: CreateCourseDto) {
    const { courseName } = data

    const course = await this.coursesRepository.findOne({
      where: { name: courseName }
    })
    if (course) {
      throw new BadRequestException('Такой курс уже существует')
    }

    await this.coursesRepository.insert({ name: courseName })
  }

  async assign(data: AssignCourseDto) {
    const { courseName, username } = data

    const user = await this.usersRepository.findOne({
      where: { username }
    })
    if (!user) {
      throw new NotFoundException('Такого пользователя не существует')
    }
    const course = await this.coursesRepository.findOne({
      where: { name: courseName }
    })
    if (!course) {
      throw new NotFoundException('Такого курса не существует')
    }
    const studentCourse = await this.studentsCoursesRepository.findOne({
      where: {
        user: { id: user.id },
        course: { id: course.id }
      }
    })
    if (studentCourse) {
      throw new BadRequestException('Пользователь уже имеет данный курс')
    }

    await this.studentsCoursesRepository.insert({
      user: { id: user.id },
      course: { id: course.id }
    })
  }

  async assignInstructor(data: AssignInstructorDto) {
    const { username, courseName } = data

    const user = await this.usersRepository.findOneWithRoles({
      where: { username }
    })
    if (!user) {
      throw new NotFoundException('Такого пользователя не существует')
    }
    const course = await this.coursesRepository.findOne({
      where: { name: courseName }
    })
    if (!course) {
      throw new NotFoundException('Такого курса не существует')
    }

    const candidate = await this.instructorsRepository.findOne({
      where: {
        user: { id: user.id },
        course: { id: course.id }
      }
    })
    if (candidate) {
      throw new BadRequestException('Преподаватель уже ведет данный курс')
    }

    const userRoles = user.usersRoles.map(userRole => userRole.role.name)
    if (!userRoles.includes('преподаватель')) {
      await this.usersRolesRepository.insert({
        user: { id: user.id },
        role: { id: 2 }
      })
    }

    await this.instructorsRepository.insert({
      user: { id: user.id },
      course: { id: course.id }
    })
  }
}

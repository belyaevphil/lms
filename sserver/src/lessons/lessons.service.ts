import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { StudentsLessonsRepository, LessonsRepository } from './repositories'
import { AddAnswerDto, GradeAnswerDto } from './dto'

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonsRepository)
    private readonly lessonsRepository: LessonsRepository,
    @InjectRepository(StudentsLessonsRepository)
    private readonly studentsLessonsRepository: StudentsLessonsRepository
  ) {}

  async getOneById(data: { lessonId: number; userId: number }) {
    const { lessonId, userId } = data

    const ownedLesson = await this.studentsLessonsRepository.findOneByUserAndLessonIds(
      {
        where: {
          userId,
          lessonId
        }
      }
    )
    if (!ownedLesson) {
      throw new NotFoundException('Такого урока нет')
    }

    const files = ownedLesson.lesson.lessonsFiles.map(file => {
      return { originalName: file.originalName, path: file.path }
    })

    return {
      id: ownedLesson.id,
      name: ownedLesson.lesson.name,
      description: ownedLesson.lesson.description,
      answer: ownedLesson.answer,
      grade: ownedLesson.grade,
      status: ownedLesson.status,
      files
    }
  }

  async getInstructorLesson(data: { lessonId: number }) {
    const { lessonId } = data

    const lesson = await this.lessonsRepository.findOne({
      where: {
        id: lessonId
      }
    })

    return {
      id: lesson.id,
      courseId: lesson.course.id,
      name: lesson.name,
      description: lesson.description
    }
  }

  async getInstructorLessonToGrade(data: { lessonId: number }) {
    const { lessonId } = data

    const lesson = await this.studentsLessonsRepository.findOne({
      where: {
        id: lessonId
      }
    })

    return {
      answer: lesson.answer
    }
  }

  async getInstructorLessonsToGrade(data: { userId: number }) {
    const { userId } = data

    const lessons = await this.studentsLessonsRepository.findManyToGradeByInstructorId(
      {
        where: {
          userId
        }
      }
    )

    const lessonsData = lessons.map(lesson => {
      return {
        id: lesson.id,
        name: lesson.lesson.name
      }
    })

    return lessonsData
  }

  async update(data: { lessonId: number; userId: number }) {
    const { lessonId, userId } = data

    const ownedLesson = await this.studentsLessonsRepository.findOneByUserAndLessonIds(
      {
        where: {
          userId,
          lessonId
        }
      }
    )
    if (!ownedLesson) {
      throw new NotFoundException('Такого урока нет')
    }

    const files = ownedLesson.lesson.lessonsFiles.map(file => {
      return { originalName: file.originalName, path: file.path }
    })

    return {
      id: ownedLesson.id,
      name: ownedLesson.lesson.name,
      description: ownedLesson.lesson.description,
      status: ownedLesson.status,
      files
    }
  }

  async create(data: {
    name: string
    courseId: number
    description: string
    files: Express.Multer.File[]
  }) {
    await this.lessonsRepository.createOne(data)
  }

  async addAnswer(addAnswerDto: AddAnswerDto) {
    const ownedLesson = await this.studentsLessonsRepository.findOne(
      addAnswerDto.id
    )
    if (!ownedLesson) {
      throw new NotFoundException('Такого урока нет')
    }

    await this.studentsLessonsRepository.update(addAnswerDto.id, {
      answer: addAnswerDto.answer,
      status: 'ожидается проверка'
    })
  }

  async gradeAnswer(gradeAnswerDto: GradeAnswerDto) {
    const ownedLesson = await this.studentsLessonsRepository.findOne(
      gradeAnswerDto.id
    )
    if (!ownedLesson) {
      throw new NotFoundException('Такого урока нет')
    }

    await this.studentsLessonsRepository.update(gradeAnswerDto.id, {
      grade: gradeAnswerDto.grade,
      status: 'выполнено'
    })
  }
}
